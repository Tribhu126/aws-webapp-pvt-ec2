🚀 AWS Scalable Web Application (3-Tier Architecture)
Overview

This project demonstrates a production-style, scalable, and secure web application architecture on AWS.

It showcases how to design a fault-tolerant and stateless system using load balancing, auto scaling, private networking, and modern deployment practices — moving away from manual SSH-based deployments to a fully automated infrastructure model.

🌐 Live Demo

👉 https://app.tribhuvansharma.com

🧱 Architecture

🧠 Architecture Summary

This system follows a 3-tier architecture pattern:

Internet → Application Load Balancer → Auto Scaling Group → EC2 (Private)
🔹 Key Components
Layer	Service	Purpose
Entry	Application Load Balancer (ALB)	Routes traffic securely (HTTPS)
Compute	EC2 (Private Instances)	Runs Node.js application
Scaling	Auto Scaling Group (ASG)	Ensures availability & scaling
Networking	Security Groups	Enforces least-privilege access
Access	AWS Systems Manager (SSM)	Secure admin access (no SSH)
Monitoring	CloudWatch	Metrics and scaling triggers
🔄 Application Flow

User accesses application via:

https://app.tribhuvansharma.com
Request hits:
Application Load Balancer (ALB)
ALB forwards traffic to:
EC2 instances in private subnet

EC2 instances:

Run Node.js app (port 3000)
Managed by PM2
Serve response:
Hello from CI/CD
Auto Scaling Group:
Adds/removes instances based on CPU load
⚙️ Deployment Model (Key Highlight)

This project implements a stateless deployment architecture:

Instance Launch → User Data Script → Pull latest code → Start app
🔥 What was improved
Before	After
Manual SSH deployments	Fully automated via User Data
Stateful instances	Stateless infrastructure
Deployment inconsistencies	Consistent across all instances
🧠 How it works

Each EC2 instance on launch:

Installs dependencies (Node.js, PM2)
Pulls latest code from GitHub
Starts the application automatically
📈 Auto Scaling & Resilience

This system automatically adapts to load:

🔹 Scale Out
CPU > 60% → Add instances
🔹 Scale In
CPU < 42% → Remove instances
🧠 Fault Tolerance
ALB continuously checks instance health
Unhealthy instances are replaced automatically by ASG
Ensures zero manual intervention
🔐 Security Design

This project follows a security-first approach:

✅ Network Security
Component	Access
EC2 Instances	❌ No public access
ALB	✅ Public (HTTPS only)
EC2 Port 3000	✅ Only from ALB
SSH	❌ Completely removed
🔐 Access Management
✔ No SSH access
✔ AWS Systems Manager (SSM) used instead
✔ IAM role with least privilege
🧠 Security Benefits
Eliminates exposed ports
Reduces attack surface
Removes need for bastion host
Uses AWS-native secure access
📊 Observability
🔹 CloudWatch Metrics
CPU utilization
Instance health
Auto scaling triggers
🔹 CloudWatch Alarms
High CPU → Scale out
Low CPU → Scale in
🧪 Testing & Validation
🔹 Load consistency test
for i in {1..20}; do curl -s https://app.tribhuvansharma.com; done

✅ Result:

Consistent response across all instances
🔹 Security validation
Test	Result
Direct EC2 access	❌ Blocked
SSH access	❌ Disabled
ALB access	✅ Allowed
SSM access	✅ Allowed
💰 Cost Optimization
Removed bastion host → reduced cost
Auto scaling → avoids over-provisioning
Stateless design → efficient resource usage
🧠 Key Learnings
Designing scalable 3-tier architectures on AWS
Implementing stateless infrastructure
Replacing SSH with AWS Systems Manager
Configuring Auto Scaling with CloudWatch
Debugging multi-instance inconsistency issues
Securing applications using least privilege principles
Managing deployment lifecycle without CI/CD SSH
⚠️ Challenges Faced
Port conflicts due to multiple Node processes
Inconsistent responses across instances
SSH-based deployment limitations
Git conflicts and authentication issues
Load balancer routing inconsistencies
Security group misconfigurations
Transitioning to stateless architecture
🚀 Future Improvements
Blue/Green deployment strategy
Docker containerization
Migration to ECS / Fargate
Infrastructure as Code (Terraform)
Advanced monitoring dashboards
CI/CD pipeline (GitHub Actions without SSH)
📂 Project Structure
aws-webapp-pvt-ec2/
│
├── app.js                # Node.js application
├── deploy.sh            # Deployment script (legacy)
├── .github/
│   └── workflows/       # (Removed SSH deployment)
│
├── architecture.png
├── README.md
👤 Author

Tribhuvan Sharma
AWS Certified Solutions Architect
Aspiring Solutions Consultant / Pre-Sales Engineer
