# Task-Management-System
A Task Management System with user authentication, nested projects, and task tracking features.The frontend is minimal (just enough to test APIs); focus is on the backend (Django + DRF). Role of admin is to create Projects, assign tasks. Contributors can only view tasks assigned to them and update its status


*Installation Instructions
git clone https://github.com/meprashantsah/Task-Management-System.git
cd Task-Management-System


*Backend setup(Django)
cd taskServer
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

*Frontend Setup (React)
cd ../taskClient
npm install
npm run dev


Login and Register
![login](https://github.com/user-attachments/assets/2aaa5779-f925-4c12-9de1-8c0257dca163)
![register](https://github.com/user-attachments/assets/52d0c156-a202-461d-9900-57426ab1ccd5)

Admin UI
![admin  dashboard](https://github.com/user-attachments/assets/0219c46c-09f4-4ab2-a620-98cfba4790f5)
![admin project view](https://github.com/user-attachments/assets/f168762b-4822-4155-afb5-1d6475c81fe1)
![admin task view](https://github.com/user-attachments/assets/29bbba6b-c84f-4dc3-873b-a6285d4e5233)
![admin - create project](https://github.com/user-attachments/assets/ff97d8fc-9443-4182-9ed9-db705f3eb851)
![admin create task](https://github.com/user-attachments/assets/167e302f-de85-4829-9059-d4b62a5d9c11)
![admin - see ativity log](https://github.com/user-attachments/assets/db7d3b7d-9662-4bcd-ab4b-543c25710d66)

Contributor UI
![contributor dashboard](https://github.com/user-attachments/assets/cbe12ad1-a601-401b-83fd-24add8c78d11)
![contributor project view](https://github.com/user-attachments/assets/099dfc2c-f036-4e3f-82e3-8a47505ef572)
![contributor task view](https://github.com/user-attachments/assets/5ece3740-c8f2-4c19-b446-a849873f8da9)
![task view using fillter](https://github.com/user-attachments/assets/5a47db07-5438-4b42-9cce-741fa402eeb9)
