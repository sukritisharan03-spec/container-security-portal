import docker


def get_docker_status():

    try:
        client = docker.from_env()

        containers = client.containers.list(all=True)
        images = client.images.list()

        container_data = []

        for container in containers:
            container_data.append({
                "name": container.name,
                "status": container.status,
                "image": (
                    container.image.tags[0]
                    if container.image.tags
                    else "unknown"
                )
            })

        return {
            "status": "Connected",
            "running_containers": len(
                [c for c in containers if c.status == "running"]
            ),
            "total_containers": len(containers),
            "total_images": len(images),
            "containers": container_data
        }

    except Exception as e:
        return {
            "status": "Disconnected",
            "running_containers": 0,
            "total_containers": 0,
            "total_images": 0,
            "containers": [],
            "error": str(e)
        }


def get_images():

    try:
        client = docker.from_env()

        images = client.images.list()

        image_data = []

        for image in images:
            image_data.append({
                "id": image.id.replace("sha256:", "")[:12],
                "size": image.attrs["Size"],
                "tags": (
                    image.tags
                    if image.tags
                    else ["untagged"]
                )
            })

        return {
            "images": image_data,
            "total_images": len(images)
        }

    except Exception as e:
        return {
            "images": [],
            "total_images": 0,
            "error": str(e)
        }