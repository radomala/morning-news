terraform {
  backend "s3" {
    bucket = "devops-dev-unique-1"
    key    = "application/terraform.tfstate"
    region = "eu-west-3"
  }
}