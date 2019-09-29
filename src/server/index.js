import 'babel-polyfill';
import express from 'express';
import mysql from 'mysql';
import md5 from 'md5';
// FILE UPLOAD
import upload from './upload';

import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from '../client/routes';
import renderer from '../helpers/renderer';
import createStore from '../helpers/createStore';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import bodyParser from 'body-parser';
import webConfig from './../../webConfig';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const host = 'localhost';
const user = 'root';
const pswd = '';
const dbname = 'work';

// config db ====================================
const pool = mysql.createPool({
    host: host,
    user: user,
    password: pswd,
    port: '3306',
    database: dbname
});
const COLUMNS = {
    visitcities_column: ['id', 'imgsrc', 'city_title', 'label_before', 'label_after'],
    popularplaces_column: ['id', 'price', 'imgsrc', 'place_name', 'avatar_imgsrc', 'heart', 'account_group', 'door_simple', 'bed_double'],
    blogcategories_column: ['id', 'title', 'imgsrc'],
    bloglist_column: ['id', 'imgsrc', 'label_befor', 'label_after', 'title', 'summary'],
};

app.post(['/gettoppagedata'], async (req, res) => {
    let toppageData = {
        list_topvisitcities: [
            { 'id': 1, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_photo_01.jpg`, 'city_title': 'Lefkada', 'label_before': 'Greece', 'label_after': 'Book a home in' },
            { 'id': 2, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_photo_02.jpg`, 'city_title': 'Amsterdam', 'label_before': 'Netherlands', 'label_after': 'Book a home in' },
            { 'id': 3, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_photo_03.jpg`, 'city_title': 'Paris', 'label_before': 'France', 'label_after': 'Book a home in' },
            { 'id': 4, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_photo_04.jpg`, 'city_title': 'Prague', 'label_before': 'Czech', 'label_after': 'Book a home in' }
        ],
        popular_place_list: [
            { 'id': 1, 'price': 112, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/property/property_little_01.jpg`, 'place_name': 'Downtown Sweet House', 'avatar_imgsrc': `${webConfig.siteURL}/assets/graphics/images/avatar/avatar_01.jpg`, 'heart': 8.6, 'account_group': 4, 'door_simple': 6, 'bed_double': 2 },
            { 'id': 2, 'price': 78, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/property/property_little_02.jpg`, 'place_name': 'Large and confortable double room', 'avatar_imgsrc': `${webConfig.siteURL}/assets/graphics/images/avatar/avatar_02.jpg`, 'heart': 7.8, 'account_group': 2, 'door_simple': 3, 'bed_double': 2 },
            { 'id': 3, 'price': 51, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/property/property_little_03.jpg`, 'place_name': 'Modern studio flat with garden', 'avatar_imgsrc': `${webConfig.siteURL}/assets/graphics/images/avatar/avatar_03.jpg`, 'heart': 7.5, 'account_group': 2, 'door_simple': 1, 'bed_double': 2 },
            { 'id': 4, 'price': 130, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/property/property_little_04.jpg`, 'place_name': 'Bright clean room close to Brixton', 'avatar_imgsrc': `${webConfig.siteURL}/assets/graphics/images/avatar/avatar_04.jpg`, 'heart': 7.5, 'account_group': 2, 'door_simple': 1, 'bed_double': 2 },
            { 'id': 5, 'price': 59, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/property/property_little_05.jpg`, 'place_name': 'Romantic Suite in family home', 'avatar_imgsrc': `${webConfig.siteURL}/assets/graphics/images/avatar/avatar_05.jpg`, 'heart': 7.5, 'account_group': 2, 'door_simple': 1, 'bed_double': 2 },
            { 'id': 6, 'price': 32, 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/property/property_little_06.jpg`, 'place_name': 'Quit and bright room in the heart of Amsterdam', 'avatar_imgsrc': `${webConfig.siteURL}/assets/graphics/images/avatar/avatar_06.jpg`, 'heart': 7.5, 'account_group': 2, 'door_simple': 1, 'bed_double': 2 },
        ],
        blog_categories: [
            { 'id': 1, 'title': 'Wildlife', 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_category_special_01.png` },
            { 'id': 2, 'title': 'Adventure', 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_category_special_02.jpg` },
            { 'id': 3, 'title': 'Beaches', 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_category_special_03.jpg` },
            { 'id': 4, 'title': 'Monuments', 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_category_special_04.jpg` },
            { 'id': 5, 'title': 'Food', 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_category_special_05.jpg` },
            { 'id': 6, 'title': 'Party', 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_category_special_06.jpg` },
            { 'id': 7, 'title': 'Museum', 'imgsrc': `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_category_special_07.jpg` }
        ],
        blog_list: [
            { id: 1, imgsrc: `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_article_01.jpg`, label_befor: 'Travel', label_after: 'Book a home in', title: 'Getting Cheap Airfare For Last Minute Travel', summary: 'The city of southern California, san diego is locally known as ‘America’s Finest City’. It’s located on San Diego Bay, an inlet of the Pacific Ocean near the Mexican border. San Diego is the second largest city in' },
            { id: 2, imgsrc: `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_article_02.jpg`, label_befor: 'Beauty', label_after: 'Book a home in', title: '10 Steps To Look Younger', summary: 'Lots of people are unaware of the fact that adult acne exists and they seem not to know how to treat adult acne. People have this misconception that acne only happens during teenage years and gradually wears off as they age. For most people, this fact may be true but it is important to note that acne does not start during teenage years only. However, it is important to note that there are a significant number of adults that experience such condition.' },
            { id: 3, imgsrc: `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_article_03.jpg`, label_befor: 'Cooking', label_after: 'Book a home in', title: 'The Benefits And Drawbacks Of Buying Designer Kitchenware Products', summary: 'When it is time to bake cookies, we usually think that it is complicated, that it takes a lot of time. In one word : that it is not worthwhile ! We will show you hereunder that it is simply not true. Baking cookies is easy, fast and, most important, fun. Come and join all our readers who decided to give it a try and now,' },
            { id: 4, imgsrc: `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_article_04.jpg`, label_befor: 'Advertising', label_after: 'Book a home in', title: 'Enhance Your Brand Potential With Giant Advertising Blimps', summary: 'It is a small world after all. Globalization is that great process that started perhaps with Mr. Marco Polo, but has since regained its prestige after a short stint of protectionism following the great depression' },
            { id: 5, imgsrc: `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_article_05.jpg`, label_befor: 'Motivation', label_after: 'Book a home in', title: 'Counting Your Chicken Before They Hatch', summary: 'Be more concerned with your character than with your reputation. Your character is what you really are while your reputation is merely what others think you are.' },
            { id: 6, imgsrc: `${webConfig.siteURL}/assets/graphics/images/magic_grid/magic_grid_article_06.jpg`, label_befor: 'Tech', label_after: 'Book a home in', title: 'Download Anything Now A Days', summary: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! Downloading music to your Ipod has more than one pitfall associated with it, and this article will tell you the best way to download free song for Ipod.' }
        ]
    };

    let retVal = {
        list_topvisitcities: [],
        popular_place_list: [],
        blog_categories: [],
        blog_list: []
    }
    let queryString = 'SELECT * FROM visitcities';
    await pool.query(queryString, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length > 0) {
            rows.map(entry => {
                const e = {};
                COLUMNS.visitcities_column.forEach(c => {
                    if (c == 'imgsrc') {
                        e[c] = webConfig.siteURL + entry[c];
                    }
                    else
                        e[c] = entry[c];
                });
                retVal.list_topvisitcities.push(e);
            })
        } else {
            retVal.list_topvisitcities = []
        }
        // res.json(retVal);
    });
    queryString = 'SELECT * FROM popular_places';
    await pool.query(queryString, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length > 0) {
            rows.map(entry => {
                const e = {};
                COLUMNS.popularplaces_column.forEach(c => {
                    if (c == 'imgsrc' || c == 'avatar_imgsrc') {
                        e[c] = webConfig.siteURL + entry[c];
                    }
                    else
                        e[c] = entry[c];
                });
                retVal.popular_place_list.push(e);
            })
        } else {
            retVal.popular_place_list = []
        }
    });
    queryString = 'SELECT * FROM blog_categories';
    await pool.query(queryString, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length > 0) {
            rows.map(entry => {
                const e = {};
                COLUMNS.blogcategories_column.forEach(c => {
                    if (c == 'imgsrc') {
                        e[c] = webConfig.siteURL + entry[c];
                    }
                    else
                        e[c] = entry[c];
                });
                retVal.blog_categories.push(e);
            })
        } else {
            retVal.blog_categories = []
        }
    });
    queryString = 'SELECT * FROM blog_list';
    await pool.query(queryString, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length > 0) {
            rows.map(entry => {
                const e = {};
                COLUMNS.bloglist_column.forEach(c => {
                    if (c == 'imgsrc') {
                        e[c] = webConfig.siteURL + entry[c];
                    }
                    else
                        e[c] = entry[c];
                });
                retVal.blog_list.push(e);
            })
        } else {
            retVal.blog_list = []
        }
        res.json(retVal);
    });
});

app.post(['/getcitypagedata'], async (req, res) => {
    let retVal = {
        popular_place_list: [],
        selected_citydata: null
    }
    let queryString = '';
    let cityID = req.body.cityID;
    if (cityID) {
        queryString = 'SELECT * FROM visitcities WHERE id="' + cityID + '"';
        await pool.query(queryString, function (err, rows, fields) {
            if (err) throw err;
    
            if (rows.length > 0) {
                rows.map(entry => {
                    const e = {};
                    COLUMNS.visitcities_column.forEach(c => {
                        if (c == 'imgsrc') {
                            e[c] = webConfig.siteURL + entry[c];
                        }
                        else
                            e[c] = entry[c];
                    });
                    retVal.selected_citydata = e;
                })
            }
        });
    }
    queryString = 'SELECT * FROM popular_places';
    await pool.query(queryString, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length > 0) {
            rows.map(entry => {
                const e = {};
                COLUMNS.popularplaces_column.forEach(c => {
                    if (c == 'imgsrc' || c == 'avatar_imgsrc') {
                        e[c] = webConfig.siteURL + entry[c];
                    }
                    else
                        e[c] = entry[c];
                });
                retVal.popular_place_list.push(e);
            })
        } else {
            retVal.popular_place_list = []
        }
        res.json(retVal);
    });
});

app.get(['/*/:param', '*'], (req, res) => {
    const ParamValue = req.params.param ? req.params.param : null;

    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => {
            return route.loadData ? route.loadData(store, ParamValue) : null;
        })
        .map(promise => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve);
                });
            }
        });

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.url) {
            return res.redirect(301, context.url);
        }

        // check if 404
        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    });
});

app.post('/sendmail', (req, response) => {

    var mailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });

    mailer.use('compile', hbs({
        viewPath: 'build/assets/email_templates',
        extName: '.hbs'
    }));

    mailer.sendMail({
        from: '',
        to: '',
        subject: 'Contact Form',
        template: 'contactForm',
        context: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            message: req.body.message
        }
    }, function (err, res) {
        if (err) {
            console.log(err)
            response.status(500).send('500 - Internal Server Error')
        }
        response.status(200).send('200 - The request has succeeded.')
    });

});

app.post('/login', (req, response) => {
    // // login attempt send mail to admin
    // var mailer = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'yonexhuffman@gmail.com',
    //         pass: 'zidane1993912'
    //     }
    // });

    // mailer.use('compile', hbs({
    //     viewPath: 'build/assets/email_templates',
    //     extName: '.hbs'
    // }));

    // let mail_content = 'Someone attempted with this email : ' + req.body.email + '.';
    // mailer.sendMail({
    //     from: 'ottovonbismark912@gmail.com',
    //     to: 'yonexhuffman@gmail.com',
    //     subject: 'Login Attempt',
    //     template: 'loginForm',
    //     context: {
    //         email: req.body.email,
    //         password: req.body.password ,
    //         message: mail_content
    //     }
    // }, function(err, res){
    //     if(err){
    //         console.log(err)
    //         response.status(500).send('500 - Internal Server Error')
    //     }
    //     response.status(200).send('200 - The request has succeeded.') 
    // });

    // login
    let input_values = {
        email: req.body.email,
        password: req.body.password
    }
    let retVal = {
        status: 0,
        message: 'Empty Users !'
    }

    let queryString = 'SELECT * FROM user_list where user_email = "' + input_values.email + '"';
    pool.query(queryString, function (err, rows, fields) {
        if (err) throw err;
        if (rows.length > 0) {
            rows.map(entry => {
                if (entry['password'] == md5(input_values.password)) {
                    retVal['status'] = 2;
                    retVal['message'] = 'Login Success !';
                }
                else {
                    retVal['status'] = 1;
                    retVal['message'] = 'Password Uncorrect !';
                }
            })
            response.json(retVal)
        } else {
            response.json(retVal)
        }
    });
})

app.post('/uploadfile', upload)

app.listen(port, () => {
    console.log(`Running on Port ${port}`);
});
