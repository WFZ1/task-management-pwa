**Progressive Web App** (PWA) for task management with the possibility of offline mode and installation on the device.

-   Tasks have a name, description, deadline, priority and status (completed/not completed).
-   The user can create, view, edit, mark as completed and delete tasks.
-   Filtering tasks based on title, deadline, priority or status.
-   Sorting tasks based on priority or status.
-   shadcn/ui is used as component library.
-   tailwind is used as CSS framework.
-   Firestore database stores and handles tasks data.
-   PWA with basic features like offline mode and on-device installation.
-   The application is deployed on Firebase Hosting.
-   Full CI/CD using Github Actions.

## Hosting

Firebase: https://task-management-27b61.web.app/

## Run app

1. install dependencies `npm i`
2. run `npm dev`

## Run app with PWA

1. install dependencies `npm i`
2. run `npm build`
3. run `npm preview`

## Manually Deployment to Firebase

To deploy, run the following command from the root of project directory:

```
firebase deploy
```
