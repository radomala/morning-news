variable "vpc_cidr" {
  description = "VPC CIDR"
  type        = string
}

variable "public_subnets" {
  description = "Liste des blocs CIDR pour les sous-réseaux publics"
  type        = list(string)
}
