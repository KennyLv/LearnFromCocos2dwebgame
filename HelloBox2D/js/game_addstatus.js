// Commen code for using Box2D object.
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2AABB = Box2D.Collision.b2AABB;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2Joints =  Box2D.Dynamics.Joints;
var b2Contacts =  Box2D.Dynamics.Contacts;
var b2Listener = Box2D.Dynamics.b2ContactListener;

// Global game varibles
var arrowGame = {
    STATE_START: 1,
    STATE_PLAY: 2,
    STATE_OVER: 3,
    MAX_ARROWS: 3,

    state: 0,
    arrow_number: 0,
    cur_level:0, 

    chargeTaskID: 0,
    power: 0,
    powerBar: 0
}

// Canvas for drawing.
var canvas;
var canvasPosition;
var context;

function init() {
    canvas= document.getElementById("canvas");
    canvasPosition = getElementPosition(canvas);
    context = canvas.getContext("2d");
    arrowGame.powerBar = document.getElementById("power_bar");

    document.addEventListener("click", onStartClick);

    arrowGame.state = arrowGame.STATE_START;
    showStartScreen();
}

function onStartClick(e) {
    if(arrowGame.state == arrowGame.STATE_START) {
        arrowGame.state = arrowGame.STATE_PLAY;
        console.log("Current state:"+arrowGame.state);
        play();
    }
}

function showStartScreen() {
    // Draw start image.
}

function play() {
    // World constants.
    var worldScale = 30;
    var dragConstant=0.05;
    var dampingConstant = 2;
    var world; 
    var arrows = [];
    var gameTaskID;

    initWorld();
    initGameLevel();
    mainLoop();

    function initWorld() {
        world = new b2World(new b2Vec2(0, 10),true);

        var arrowContactListener = new b2Listener;
        arrowContactListener.PreSolve = arrowPreSolve;
        world.SetContactListener(arrowContactListener);

        //Add listeners for mouse events.
        document.addEventListener("mousedown",onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
    }

    function initGameLevel() {
        // Set number of arrow.
        arrowGame.arrow_number = arrowGame.MAX_ARROWS;

        // Create bottom wall
        createBox(800,30,400,480,b2Body.b2_staticBody,{name:"wall"});
        // Create top wall
        //createBox(800,30,400,0,b2Body.b2_staticBody,{name:"wall"});
        // Create left wall
        //createBox(30,480,0,240,b2Body.b2_staticBody,{name:"wall"});
        // Create right wall
        createBox(30,480,800,240,b2Body.b2_staticBody,{name:"wall"});

        // Create target.
        createBox(50,50,300,200,b2Body.b2_staticBody,{name:"target", src:document.getElementById("star")});
    }

    function mainLoop() {
        debugDraw(); 
        gameTaskID = window.setInterval(update,1000/60); 
    }

    function update() { 
        world.Step(1/60,10,10);
        world.ClearForces();

        for(var i=0; i<arrows.length; i++){
            var body = arrows[i];
            if (body.GetType()==b2Body.b2_dynamicBody) {
                if (body.GetUserData().isflying) {
                    // Update arrows' rotate angle.
                    updateArrow(body);
                }
            }
            else {
                arrows.splice(i,1);
                body.SetBullet(false);
                body.GetUserData().follow=false;
            }
        }

        world.DrawDebugData();

        checkGameState();
    }

    function checkGameState() {
        if(arrowGame.arrow_number == 0) {
            // Make sure there is no arrow flying
            for(var i=0; i<arrows.length; i++) {
                if(arrows[i].GetUserData().isflying) {
                    return;
                }
            }
            
            clearInterval(gameTaskID);

            arrowGame.powerBar.style.width = 0;
            arrowGame.state = arrowGame.STATE_START;

            alert("There are no more ARROW!");

            document.removeEventListener("mousedown",onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);

            showStartScreen();
            return;
        }
    }

    function allowCreateArrow() {
        for(var i=0; i<arrows.length; i++) {
            if(arrows[i].GetUserData().isflying) {
                console.log(arrows[i].GetUserData().isflying);
                return false;
            }
        }

        if(arrowGame.arrow_number == 0) {
            return false;
        }

        return true;
    }

    function onMouseDown(e){

        if(arrowGame.state == arrowGame.STATE_PLAY) {
            if(allowCreateArrow()) {
                arrowGame.chargeTaskID = setInterval(calculateStrength, 25);
            }
        }
    }

    function onMouseUp(e) {
        if(arrowGame.state == arrowGame.STATE_PLAY) {
            // Only one arrow in gaming.
            if(allowCreateArrow()) {
                createArrow(e.clientX-canvasPosition.x,e.clientY-canvasPosition.y, arrowGame.power);
                clearInterval(arrowGame.chargeTaskID);
                arrowGame.power = 0;
            }
        }
    }

    function calculateStrength() {       
        arrowGame.power++;
        arrowGame.powerBar.style.width = arrowGame.power*10 + "px";

        if(arrowGame.powerBar.style.width == "300px"){ 
            clearInterval(arrowGame.chargeTaskID); 
        }
    }

    function debugDraw() {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
        debugDraw.SetDrawScale(worldScale);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
    }

    function createBox(width,height,pX,pY,type,data) {
        var bodyDef = new b2BodyDef;
        bodyDef.type = type;
        bodyDef.position.Set(pX/worldScale,pY/worldScale);
        bodyDef.userData=data;

        var polygonShape = new b2PolygonShape;
        polygonShape.SetAsBox(width/2/worldScale,height/2/worldScale);

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.5;
        fixtureDef.shape = polygonShape;

        var body=world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
    }

    function createArrow(pX, pY, vel) {
        // Set the left corner as the original point.
        var angle = Math.atan2(pY-450, pX);

        // Define the shape of arrow.
        var vertices = [];
        vertices.push(new b2Vec2(-1.4,0));
        vertices.push(new b2Vec2(0,-0.1));
        vertices.push(new b2Vec2(0.6,0));
        vertices.push(new b2Vec2(0,0.1));

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(40/worldScale,400/worldScale);
        bodyDef.userData = {name:"arrow", isflying:true, src:document.getElementById("arrow_img")};

        var polygonShape = new b2PolygonShape;
        polygonShape.SetAsVector(vertices,4);

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.5;
        fixtureDef.shape = polygonShape;

        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);

        // Set original state of arrow.
        body.SetLinearVelocity(new b2Vec2(vel*Math.cos(angle), vel*Math.sin(angle)));
        body.SetAngle(angle);
        body.SetAngularDamping(dampingConstant);

        // Update arrow array.
        for(var i=0; i<arrows.length; i++) {
            arrows[i].GetUserData().follow = false;
        }
        arrows.push(body);
        arrowGame.arrow_number--;
    }

    function arrowPreSolve(contact, oldManifold){
        var contactPoint = new b2Vec2;
        var weldJointDef = new b2Joints.b2WeldJointDef;

        if(contact.IsTouching()){
            var bodyA = contact.GetFixtureA().GetBody();
            var bodyB = contact.GetFixtureB().GetBody();
            var objA = bodyA.GetUserData();
            var objB = bodyB.GetUserData();
            if (objA.name=="arrow" && objB.name=="arrow") {
                for (var j = bodyA.GetJointList(); j; j=j.next) {
                    bodyA.GetWorld().DestroyJoint(j.joint);
                }
                for (j=bodyB.GetJointList(); j; j=j.next) {
                    bodyB.GetWorld().DestroyJoint(j.joint);
                }
            }

            if (objA.name=="arrow" && objB.name=="target") {
                if (objA.isflying) {
                    weldJointDef = new b2Joints.b2WeldJointDef;
                    weldJointDef.Initialize(bodyB,bodyA,bodyA.GetWorldCenter());
                    bodyB.GetWorld().CreateJoint(weldJointDef);
                }
                console.log("Hit Target!");
            }

            if (objB.name=="wall"&&objA.name=="arrow") {
                if (objA.isflying) {
                    weldJointDef = new b2Joints.b2WeldJointDef;
                    weldJointDef.Initialize(bodyA,bodyB,bodyB.GetWorldCenter());
                    bodyA.GetWorld().CreateJoint(weldJointDef);
                }

            }

            if (objB.name=="arrow") {
                objB.isflying=false;
            }
            if (objA.name=="arrow") {
                objA.isflying=false;
            }

        }
    }

    function updateArrow(arrowBody) {
        // Calculate arrow's fligth speed.
        var flightSpeed = Normalize2(arrowBody.GetLinearVelocity());

        // Calculate arrow's pointing direction.
        var bodyAngle = arrowBody.GetAngle();
        var pointingDirection = new b2Vec2(Math.cos(bodyAngle), -Math.sin(bodyAngle));

        // Calculate arrow's flighting direction and normalize it.
        var flightAngle = Math.atan2(arrowBody.GetLinearVelocity().y,arrowBody.GetLinearVelocity().x);
        var flightDirection = new b2Vec2(Math.cos(flightAngle), Math.sin(flightAngle));

        // Calculate dot production.
        var dot = b2Dot( flightDirection, pointingDirection );
        var dragForceMagnitude = (1 - Math.abs(dot)) * flightSpeed * flightSpeed * dragConstant * arrowBody.GetMass();
        var arrowTailPosition = arrowBody.GetWorldPoint(new b2Vec2( -1.4, 0 ) );
        arrowBody.ApplyForce( new b2Vec2(dragForceMagnitude*-flightDirection.x,dragForceMagnitude*-flightDirection.y), arrowTailPosition );
    }

    function b2Dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    function Normalize2(b) {
        return Math.sqrt(b.x * b.x + b.y * b.y);
    }
}

//http://js-tut.aardon.de/js-tut/tutorial/position.html
function getElementPosition(element) {
    var elem=element, tagname="", x=0, y=0;
    while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
        y += elem.offsetTop;
        x += elem.offsetLeft;
        tagname = elem.tagName.toUpperCase();
        if(tagname == "BODY"){
            elem=0;
        }
        if(typeof(elem) == "object"){
            if(typeof(elem.offsetParent) == "object"){
                elem = elem.offsetParent;
            }
        }
    }
    return {x: x, y: y};
}

