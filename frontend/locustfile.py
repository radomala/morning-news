from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    @task
    def load_home_page(self):
        self.client.get("http://127.0.0.1:3001")  # Remplacez par l'URL de votre page d'accueil

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)  # Temps d'attente entre les requêtes
