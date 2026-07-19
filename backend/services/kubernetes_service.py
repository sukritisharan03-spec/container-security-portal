import subprocess
import json


def get_kubernetes_status():
    try:
        cluster = subprocess.run(
            ["kubectl", "cluster-info"],
            capture_output=True,
            text=True
        )

        if cluster.returncode != 0:
            return {
                "status": "Disconnected",
                "nodes": 0,
                "pods": 0,
                "error": cluster.stderr
            }

        nodes = subprocess.run(
            ["kubectl", "get", "nodes", "-o", "json"],
            capture_output=True,
            text=True
        )

        nodes_data = json.loads(nodes.stdout)
        node_count = len(nodes_data["items"])

        pods = subprocess.run(
            [
                "kubectl",
                "get",
                "pods",
                "--all-namespaces",
                "-o",
                "json"
            ],
            capture_output=True,
            text=True
        )

        pods_data = json.loads(pods.stdout)

        pod_list = []

        for pod in pods_data["items"]:
            pod_list.append({
                "name": pod["metadata"]["name"],
                "namespace": pod["metadata"]["namespace"],
                "status": pod["status"]["phase"]
            })

        return {
            "status": "Connected",
            "nodes": node_count,
            "pods": len(pod_list),
            "pod_details": pod_list
        }

    except Exception as e:
        return {
            "status": "Disconnected",
            "nodes": 0,
            "pods": 0,
            "error": str(e)
        }


def get_deployments():
    try:
        deployments = subprocess.run(
            [
                "kubectl",
                "get",
                "deployments",
                "--all-namespaces",
                "-o",
                "json"
            ],
            capture_output=True,
            text=True
        )

        data = json.loads(deployments.stdout)

        deployment_list = []

        for item in data["items"]:
            deployment_list.append({
                "name": item["metadata"]["name"],
                "namespace": item["metadata"]["namespace"],
                "ready": f'{item["status"].get("readyReplicas",0)}/{item["status"].get("replicas",0)}',
                "available": item["status"].get("availableReplicas", 0),
                "status": "Healthy" if item["status"].get("availableReplicas", 0) == item["status"].get("replicas", 0) else "Warning"
            })

        return {
            "deployments": deployment_list,
            "total_deployments": len(deployment_list)
        }

    except Exception as e:
        return {
            "deployments": [],
            "total_deployments": 0,
            "error": str(e)
        }


def get_compliance_checks():
    try:
        deployments = subprocess.run(
            [
                "kubectl",
                "get",
                "deployments",
                "--all-namespaces",
                "-o",
                "json"
            ],
            capture_output=True,
            text=True
        )

        data = json.loads(deployments.stdout)

        checks = []

        for item in data["items"]:
            replicas = item["status"].get("availableReplicas", 0)
            total = item["status"].get("replicas", 0)

            checks.append({
                "deployment": item["metadata"]["name"],
                "namespace": item["metadata"]["namespace"],
                "replicas": f"{replicas}/{total}",
                "compliance": "Passed" if replicas == total else "Failed"
            })

        return {
            "checks": checks,
            "total_checks": len(checks)
        }

    except Exception as e:
        return {
            "checks": [],
            "total_checks": 0,
            "error": str(e)
        }