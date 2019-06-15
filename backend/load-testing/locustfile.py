import random
from locust import HttpLocust, TaskSet, task

ALPHABET = "abcdefghijklmnopqrstuvwxyz"


class UserBehavior(TaskSet):
    @task(1)
    def create(self):
        body = {"title": generate_title(), "body": {}}
        self.client.post("/fractals", json=body)

    @task(10)
    def get(self):
        self.client.get(f"/fractals/test")

    @task(5)
    def list(self):
        self.client.get("/fractals")


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 1000
    max_wait = 10000


def generate_title(length=20):
    return "".join(random.choices(ALPHABET, k=length))
