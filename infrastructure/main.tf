resource "aws_vpc" "main-vpc" {           
  cidr_block           = var.vpc_cidr 
  enable_dns_support   = true         
  enable_dns_hostnames = true         

  tags = {
    Name        = "main-vpc"
    Terraform   = "true"
    Environment = "dev"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main-vpc.id

  tags = {
    Name        = "igw"
    Environment = "dev"
  }
}

resource "aws_route_table" "public-routetable" {
  vpc_id = aws_vpc.main-vpc.id

  tags = {
    Name        = "public-routetable"
    Environment = "dev"
  }
}

resource "aws_route" "public_route" {
  route_table_id         = aws_route_table.public-routetable.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id 
}


resource "aws_route_table_association" "route_table_association" {
  count          = length(var.public_subnets)
  subnet_id      = aws_subnet.public_subnet[count.index].id
  route_table_id = aws_route_table.public-routetable.id
}

resource "aws_subnet" "public_subnet" {
  count      = length(var.public_subnets)               
  vpc_id     = aws_vpc.main-vpc.id                  
  cidr_block = element(var.public_subnets, count.index) 

  availability_zone = data.aws_availability_zones.azs.names[0] 

  map_public_ip_on_launch = true 

  tags = {
    Name        = "public-subnet-${count.index + 1}" 
    Environment = "dev"                                 
  }
}

resource "aws_security_group" "application-sg" {
  name        = "application-sg"
  description = "Security group for application"

  vpc_id = aws_vpc.main-vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9100
    to_port     = 9100
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "application-sg"
  }
}

resource "aws_security_group" "grafana-sg" {
  name        = "grafana-sg"
  description = "Allow TLS inbound traffic and all outbound traffic"

  vpc_id = aws_vpc.main-vpc.id

  ingress {
    description = "ssh"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "https"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "http"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "grafana"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "grafana-sg"
  }
}

resource "aws_security_group" "prometheus-sg" {
  name        = "prometheus-sg"
  description = "Allow TLS inbound traffic and all outbound traffic"

  vpc_id = aws_vpc.main-vpc.id

  ingress {
    description = "ssh"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "https"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "http"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "http"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "prometheus"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "node_exporter"
    from_port   = 9100
    to_port     = 9100
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "prometheus-sg"
  }
}

resource "aws_instance" "server-backend" {
  ami                    = "ami-045a8ab02aadf4f88" 
  instance_type          = "t2.micro"
  key_name               = "paire_cle_aws"

  vpc_security_group_ids = [aws_security_group.application-sg.id]

  subnet_id                   = aws_subnet.public_subnet[0].id

  associate_public_ip_address = true

  availability_zone = data.aws_availability_zones.azs.names[0]

  tags = {
    Name = "server-backend"
    Terraform   = "true"
    Environment = "dev"
  }
}

resource "aws_instance" "server-frontend" {
  ami                    = "ami-045a8ab02aadf4f88" 
  instance_type          = "t2.micro"
  key_name               = "paire_cle_aws"

  vpc_security_group_ids = [aws_security_group.application-sg.id]

  subnet_id                   = aws_subnet.public_subnet[0].id

  associate_public_ip_address = true 

  availability_zone = data.aws_availability_zones.azs.names[0]

  tags = {
    Name = "server-frontend"
    Terraform   = "true"
    Environment = "dev"
  }
}

resource "aws_instance" "server-prometheus" {
  ami = "ami-045a8ab02aadf4f88"
  instance_type = "t2.micro"
  key_name      = "paire_cle_aws"
  monitoring    = true

  vpc_security_group_ids      = [aws_security_group.prometheus-sg.id]

  subnet_id                   = aws_subnet.public_subnet[0].id

  associate_public_ip_address = true

  availability_zone = data.aws_availability_zones.azs.names[0]

  tags = {
    Name        = "server-prometheus"
    Terraform   = "true"
    Environment = "dev"
  }

}

resource "aws_instance" "server-grafana" {
  ami = "ami-045a8ab02aadf4f88"
  instance_type = "t2.micro"
  key_name      = "paire_cle_aws"
  monitoring    = true

  vpc_security_group_ids      = [aws_security_group.grafana-sg.id]
  subnet_id                   = aws_subnet.public_subnet[0].id 
  associate_public_ip_address = true

  availability_zone = data.aws_availability_zones.azs.names[0] 

  tags = {
    Name        = "grafana-server"
    Terraform   = "true"
    Environment = "dev"
  }

}

resource "local_file" "ansible_inventory" {
  content = templatefile("${path.module}/inventory.tpl", {
    server-backend_ip  = aws_instance.server-backend.public_ip,
    server-frontend_ip = aws_instance.server-frontend.public_ip,
    server-prometheus_ip = aws_instance.server-prometheus.public_ip,
    server-grafana_ip = aws_instance.server-grafana.public_ip

  })
  filename = "${path.module}/inventory.yml"
}

resource "null_resource" "run_ansible" {
  provisioner "local-exec" {
    command = "sleep 40 && ansible-playbook -i ${path.module}/inventory.yml --private-key ${local.private_key_path} application-playbook.yml"
  }

  depends_on = [aws_instance.server-backend, aws_instance.server-frontend, aws_instance.server-prometheus, aws_instance.server-grafana]
}

output "back_ip" {
  value = aws_instance.server-backend.public_ip
}

output "front_ip" {
  value = aws_instance.server-frontend.public_ip
}

output "prometheus_ip" {
  value = aws_instance.server-prometheus.public_ip
}

output "grafana_ip" {
  value = aws_instance.server-grafana.public_ip
}
