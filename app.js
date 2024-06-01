const electron = require("electron");
const config = require("./config.json");
const Discord = require("discord.js");
const express = require("express");
const bodyParser = require("body-parser");
const client = new Discord.Client();
const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;


const ExpressApp = express();

ExpressApp.listen(3000);

ExpressApp.set("view engine", "ejs");
ExpressApp.use("/public", express.static("public"));
ExpressApp.use(bodyParser.urlencoded({extended: true}));


app.on("ready", () => {

    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        resizable: true,
        title: "Application",
        webPreferences: {
            nodeIntegration: true
        }
    });

    /**
     * We need to be sure that our bot is ready when application is up!
     */
    client.on("ready", () => {

        mainWindow.loadURL("http://localhost:3000/");
        mainWindow.on("closed", () => {

            app.quit();

        });
    
    });

    /**
     * I really don't like using an app with a menu. Who does tough?
     */
    mainWindow.setMenu(null);
    // mainWindow.webContents.openDevTools();

});

ExpressApp.get("/", async(req, res) => {

    res.render("main", {client});

});

ExpressApp.post("/guilds/", async(req, res) => {

    const guild = await client.guilds.get(req.body.guildID);

    if (!guild) {

        return res.render("main", {client});

    }

    /**
     * Guild rendering from the very first beginnig of the application.
     */
    return res.render("guildUI", {client,
        guild,
        error: "",
        success: ""});
    
});


/**
 * Ban route for handling request from UI.
 */
ExpressApp.get("/ban/:guildid", async (req, res) => {

    const guild = await client.guilds.get(req.params.guildid);

    if (!guild) {

        return res.render("main", {client});

    }

    const member = await guild.members.get(req.query.userid);
    const data = {client,
        guild,
        error: "",
        success: ""};

    if (!member){

        data.error = `Can't find member with ID ${req.query.userid}`;
        
        return res.render("guildUI", data);
    
    }

    if (member.user.id === client.user.id){

        data.error = `Can't ban myself. Sorry :/`;
        
        return res.render("guildUI", data);
    
    }

    return member.ban(`[Ban @ ElectronCord] ${req.query.reason || "No reason specified."}`).then(() => {

        data.success = `Sucessfully banned ${member.user.tag}`;
        
        return res.render("guildUI", data);
    
    }).
        catch(err => {

            data.error = `Can't ban ${member.user.tag} because of ${err.message}`;
        
            return res.render("guildUI", data);
    
        });
        
});


/**
 * Kick route for handling request from UI.
 */
ExpressApp.get("/kick/:guildid", async (req, res) => {

    const guild = await client.guilds.get(req.params.guildid);

    if (!guild) {

        return res.render("main", {client});

    }

    const member = await guild.members.get(req.query.userid);
    const data = {client,
        guild,
        error: "",
        success: ""};

    if (!member){

        data.error = `Can't find member with ID ${req.query.userid}`;
        
        return res.render("guildUI", data);
    
    }

    if (member.user.id === client.user.id){

        data.error = `Can't kick myself. You really want me to leave? :(`;
        
        return res.render("guildUI", data);
    
    }

    return member.kick(`[Kick @ ElectronCord] ${req.query.reason || "No reason specified."}`).then(() => {

        data.success = `Sucessfully kick ${member.user.tag}`;
        
        return res.render("guildUI", data);
    
    }).
        catch(err => {

            data.error = `Can't kick ${member.user.tag} because of ${err.message}`;
        
            return res.render("guildUI", data);
    
        });
        
});


/**
 * The ipcMain event handler of the ipcRenderer. Returns with an overview information about client.
 */
ipcMain.on("get:DiscordClient", (event, arg) => {

    event.sender.send("return:DiscordClient", {
        guilds: client.guilds,
        user: client.user,
        users: client.users
    });

});

client.login(config.DISCORD_TOKEN);