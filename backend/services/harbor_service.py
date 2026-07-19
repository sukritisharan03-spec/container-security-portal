import requests

# Change this according to your Harbor URL
HARBOR_URL = "http://localhost"

# If your Harbor has login enabled, put credentials here
HARBOR_USERNAME = "admin"
HARBOR_PASSWORD = "Harbor12345"


def get_projects():
    try:
        response = requests.get(
            f"{HARBOR_URL}/api/v2.0/projects",
            auth=(HARBOR_USERNAME, HARBOR_PASSWORD),
            timeout=5
        )

        if response.status_code == 200:
            projects = response.json()

            return {
                "status": "Connected",
                "total_projects": len(projects),
                "projects": projects
            }

        else:
            return {
                "status": "Disconnected",
                "total_projects": 0,
                "error": f"Harbor returned {response.status_code}"
            }

    except Exception as e:
        return {
            "status": "Disconnected",
            "total_projects": 0,
            "error": str(e)
        }