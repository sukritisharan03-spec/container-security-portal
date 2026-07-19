from flask import Flask, jsonify
from flask_cors import CORS

from services.harbor_service import get_projects
from services.docker_service import get_docker_status, get_images
from services.kubernetes_service import (
    get_kubernetes_status,
    get_deployments,
    get_compliance_checks
)

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Container Security & Compliance Portal Backend"


@app.route("/api/overview")
def overview():

    harbor_data = get_projects()
    docker_data = get_docker_status()
    kubernetes_data = get_kubernetes_status()

    return jsonify({
        "project": "Container Security & Compliance Portal",
        "security_score": 85,

        "harbor_status": harbor_data.get("status"),
        "total_projects": harbor_data.get("total_projects", 0),

        "docker_status": docker_data.get("status"),
        "running_containers": docker_data.get("running_containers", 0),

        "kubernetes_status": kubernetes_data.get("status"),
        "cluster_nodes": kubernetes_data.get("nodes", 0),

        "argocd_status": "Connected"
    })


@app.route("/api/dashboard")
def dashboard():

    docker_data = get_docker_status()
    kubernetes_data = get_kubernetes_status()

    return jsonify({
        "running_containers": docker_data.get("running_containers", 0),
        "total_containers": docker_data.get("total_containers", 0),
        "total_images": docker_data.get("total_images", 0),
        "cluster_nodes": kubernetes_data.get("nodes", 0),
        "total_pods": kubernetes_data.get("pods", 0),
        "security_score": 85
    })


@app.route("/api/images")
def images():
    return jsonify(get_images())


@app.route("/api/deployments")
def deployments():
    return jsonify(get_deployments())


@app.route("/api/compliance")
def compliance():
    return jsonify(get_compliance_checks())


# ----------- NEW ALERTS API -----------

@app.route("/api/alerts")
def alerts():

    docker_data = get_docker_status()
    kubernetes_data = get_kubernetes_status()

    alerts = []

    if docker_data.get("status") != "Connected":
        alerts.append({
            "severity": "Critical",
            "service": "Docker",
            "message": "Docker is disconnected"
        })

    if kubernetes_data.get("status") != "Connected":
        alerts.append({
            "severity": "Critical",
            "service": "Kubernetes",
            "message": "Kubernetes cluster is disconnected"
        })

    if docker_data.get("running_containers", 0) == 0:
        alerts.append({
            "severity": "High",
            "service": "Containers",
            "message": "No running containers found"
        })

    return jsonify({
        "alerts": alerts,
        "total_alerts": len(alerts)
    })


@app.route("/api/security")
def security():

    return jsonify({
        "critical": 1,
        "high": 3,
        "medium": 5,
        "low": 10
    })


@app.route("/api/projects")
def projects():

    docker_data = get_docker_status()

    return jsonify(
        docker_data.get("containers", [])
    )


@app.route("/api/activity")
def activity():

    return jsonify([
        {
            "time": "10:30 AM",
            "event": "Harbor vulnerability scan completed"
        },
        {
            "time": "11:00 AM",
            "event": "Frontend container deployed"
        }
    ])


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )