    var game = new Phaser.Game(650, 350, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
    var slickUI;
    function preload() {
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        game.load.image('menu-button', 'assets/ui/menu.png');
        game.load.image('backdrop', 'assets/backdrop.png');
        //slickUI.load('assets/ui/kenney/kenney.json');
    }
    function create() {
        game.add.sprite(0,-125,'backdrop');
        var button, panel, menuButton;
        slickUI.add(panel = new SlickUI.Element.Panel(game.width - 156, 8, 150, game.height - 16));
        panel.add(new SlickUI.Element.Text(10,0, "Menu")).centerHorizontally().text.alpha = 0.5;
        panel.add(button = new SlickUI.Element.Button(0,game.height - 166, 140, 80)).events.onInputUp.add(function () {
            console.log('Clicked save game');
        });

        button.add(new SlickUI.Element.Text(0,0, "Save game")).center();

        panel.add(button = new SlickUI.Element.Button(0,game.height - 76, 140, 40));
        button.add(new SlickUI.Element.Text(0,0, "Close")).center();

        panel.visible = false;
        var basePosition = panel.x;

        slickUI.add(menuButton = new SlickUI.Element.DisplayObject(game.width - 45, 8, game.make.sprite(0, 0, 'menu-button')));
        menuButton.inputEnabled = true;
        menuButton.input.useHandCursor = true;
        menuButton.events.onInputDown.add(function () {
            if(panel.visible) {
                return;
            }
            panel.visible = true;
            panel.x = basePosition + 156;
            game.add.tween(panel).to( {x: basePosition}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                menuButton.visible = false;
            });
            slickUI.container.displayGroup.bringToTop(panel.container.displayGroup);
        }, this);

        button.events.onInputUp.add(function () {
            game.add.tween(panel).to( {x: basePosition + 156}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                panel.visible = false;
                panel.x -= 156;
            });
            menuButton.visible = true;
        });

        var cb1, cb2;
        panel.add(cb1 = new SlickUI.Element.Checkbox(0,100, SlickUI.Element.Checkbox.TYPE_RADIO));
        cb1.events.onInputDown.add(function () {
            if(cb1.checked && cb2.checked) {
                cb2.checked = false;
            }
            if(!cb1.checked && !cb2.checked) {
                cb1.checked = true;
            }
        }, this);

        panel.add(cb2 = new SlickUI.Element.Checkbox(50,100, SlickUI.Element.Checkbox.TYPE_RADIO));
        cb2.events.onInputDown.add(function () {
            if(cb1.checked && cb2.checked) {
                cb1.checked = false;
            }
            if(!cb1.checked && !cb2.checked) {
                cb2.checked = true;
            }
        }, this);

        panel.add(new SlickUI.Element.Checkbox(100,100));
    }
    function update() {

    }