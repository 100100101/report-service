# Report service
Add ``.env`` files to client and server directories following the example from the ``.env.example`` files

``HTTPS_LOCALHOST_CRT`` and ``HTTPS_LOCALHOST_KEY`` - not necessary

Set ``IS_UPDATE_FAKE_DATA=1`` if you want to reset the database and push new generated fake data.
![8](assets/8.png)
```
cd server
npm i
npm start
```

```
cd client
npm i
npm run serve
```
### Authorization
![1](assets/1.png)
### Filter Rules
![2](assets/2.png)
![3](assets/3.png)
![4](assets/4.png)
![5](assets/5.png)
### Render report on vue
![6](assets/6.png)
### Downloaded xlsx report file
![7](assets/7.png)