const {St, Clutter} = imports.gi;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;

let panelButton, panelButtonText, timeout;

function setButtonText () {
	//command = `${__dirname}`+'/getPlayer.sh';
    var [ok, out, err, exit] = GLib.spawn_command_line_sync('bash $HOME/.local/share/gnome-shell/extensions/music_to_panel@Cdr.de/getPlayer.sh');
    var arr = [];
    var output = '';
    var stripped = out.toString().trim()
    var text = stripped.replace('.mp3','').replace('Unbekannt \n','').replace('Unknown \n','').replace('.webm','').replace('.ogg','').replace('.wav','').replace('.MP3','');
    arr = text.split('\n');
    for (let i = 0; i < arr.length; i++) {
        output += arr[i] + "- ";
    }
    output = output.slice(0,output.length-2)
	panelButtonText.set_text(output);
	return true;

}

function init () {

    panelButton = new St.Bin({
        style_class : "panel-button"
    });
    
    panelButtonText = new St.Label({
        text : "",
        y_align: Clutter.ActorAlign.CENTER
    });
    
    panelButton.set_child(panelButtonText);
    
}


function enable () {

    Main.panel._leftBox.insert_child_at_index(panelButton,0);
	timeout = Mainloop.timeout_add_seconds(5.0, setButtonText);

}

function disable () {

	Mainloop.source_remove(timeout);
    Main.panel._centerBox.remove_child(panelButton);
   
}
