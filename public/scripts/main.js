/*
 * const electron = require("electron");
 * const { ipcRenderer } = electron;
 */

// ipcRenderer.send("get:DiscordClient", "hi")


/*
 * ipcRenderer.on("return:DiscordClient", (event, client) => {
 *     document.querySelectorAll("p")[0].innerHTML = `Your bot is on ${client.guilds.size} guild and serving ${client.users.size} users!`
 * })
 */



// ;0

document.addEventListener('DOMContentLoaded', () => {

    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {

        $notification = $delete.parentNode;
  
        $delete.addEventListener('click', () => {

            $notification.parentNode.removeChild($notification);
        
        });
    
    });

});