import {app, sequelize} from './app';

const port = process.env.PORT || 9001;
(async function () {

    await sequelize.sync({force: true})


    app.listen(port, () => {
        console.log(`Application is started on localhost:${port}`);
    });

})();
