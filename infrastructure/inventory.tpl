all:
  hosts:
    backend:
      ansible_host: "${server-backend_ip}"
      ansible_user: ubuntu
    frontend:
      ansible_host: "${server-frontend_ip}"
      ansible_user: ubuntu
    prometheus:
      ansible_host: "${server-prometheus_ip}"
      ansible_user: ubuntu
    grafana:
      ansible_host: "${server-grafana_ip}"
      ansible_user: ubuntu

