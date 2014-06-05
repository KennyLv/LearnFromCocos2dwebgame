
var b2Vec2,b2AABB,b2BodyDef,b2Body, b2FixtureDef, b2Fixture, b2World, b2PolygonShape, b2DebugDraw;
var b2Joints,b2Contacts,b2Listener;

var world;
// World constants.  
var worldScale = 30;  
var dragConstant=0.05;  
var dampingConstant = 2; 

var canvas, canvasContext , canvasPosition;

function init() {  
	// Commen code for usingBox2D object.  
	b2Vec2 =Box2D.Common.Math.b2Vec2;  
	b2AABB =Box2D.Collision.b2AABB;  
	b2BodyDef =Box2D.Dynamics.b2BodyDef;  
	b2Body =Box2D.Dynamics.b2Body;  
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef;  
	b2Fixture =Box2D.Dynamics.b2Fixture;  
	b2World =Box2D.Dynamics.b2World;  
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;  
	b2DebugDraw =Box2D.Dynamics.b2DebugDraw;
	b2Joints =  Box2D.Dynamics.Joints;  
	b2Contacts =  Box2D.Dynamics.Contacts;  
	b2Listener =Box2D.Dynamics.b2ContactListener;  
	
	/* */
	world = new b2World(new b2Vec2(0, 10),true); 
	
	// Get canvas fordrawing.  
	canvas = document.getElementById("gameCanvas");  
	canvasPosition = getElementPosition(canvas);  
	canvasContext = canvas.getContext("2d");  
	/* */
	var debugDraw = new b2DebugDraw();  
	debugDraw.SetSprite(canvasContext);  
	debugDraw.SetDrawScale(worldScale);  
	debugDraw.SetFillAlpha(0.5);  
	debugDraw.SetLineThickness(1.0);  
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);  
	world.SetDebugDraw(debugDraw);  
	
	/*设置监听*/
	var arrowContactListener = new b2Listener;  
	arrowContactListener.PreSolve = arrowPreSolve;  
	//world.SetContactListener(arrowContactListener);  
		 
	// Create bottom wall  
	createBox(640,30,320,480,b2Body.b2_staticBody,null);  
	// Create top wall  
	createBox(640,30,320,0,b2Body.b2_staticBody,null);  
	// Create left wall  
	createBox(30,480,0,240,b2Body.b2_staticBody,null);  
	// Create right wall  
	createBox(30,480,640,240,b2Body.b2_staticBody,null); 
	
	/*添加事件*/
	document.addEventListener("mousedown",onMouseDown);
	
	/* 定时更新UI */
	window.setInterval(update,1000/60); 
}; 


/*设置边框*/
function createBox(width,height,pX,pY,type,data){  
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

/*绘制物体*/
function onMouseDown(e) {  
    var evt = e||window.event;  
    createArrow(e.clientX-canvasPosition.x,e.clientY-canvasPosition.y);  
}
function createArrow(pX,pY) {  
    // Set the left corner as the originalpoint.  
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
    bodyDef.userData = "Arrow";  
   
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
    body.SetLinearVelocity(new b2Vec2(20*Math.cos(angle), 20*Math.sin(angle)));  
    body.SetAngle(angle);  
    body.SetAngularDamping(dampingConstant);  
 }  

//*定时更新*//
function update() {   
	world.Step(1/60,10,10);  
	world.ClearForces();  

	for(var b = world.m_bodyList; b != null; b = b.m_next){  
		if(b.GetUserData() === "Arrow") {  
			updateArrow(b);  
		}  
	}
	world.DrawDebugData();  
}  

/*更新箭矢在空中的运动形态*/
function updateArrow(arrowBody) {  
    // Calculate arrow's fligth speed.  
    var flightSpeed =Normalize2(arrowBody.GetLinearVelocity());  
   
    // Calculate arrow's pointingdirection.  
    var bodyAngle = arrowBody.GetAngle();  
    var pointingDirection = new b2Vec2(Math.cos(bodyAngle),-Math.sin(bodyAngle));  
   
    // Calculate arrow's flightingdirection and normalize it.  
    var flightAngle =Math.atan2(arrowBody.GetLinearVelocity().y,arrowBody.GetLinearVelocity().x);  
    var flightDirection = new b2Vec2(Math.cos(flightAngle), Math.sin(flightAngle));  
   
    // Calculate dot production.  
    var dot = b2Dot( flightDirection,pointingDirection );  
    var dragForceMagnitude = (1 -Math.abs(dot)) * flightSpeed * flightSpeed * dragConstant *arrowBody.GetMass();  
    var arrowTailPosition =arrowBody.GetWorldPoint(new b2Vec2( -1.4, 0 ) );  
    arrowBody.ApplyForce( new b2Vec2(dragForceMagnitude*-flightDirection.x,dragForceMagnitude*-flightDirection.y),arrowTailPosition );  
}  
   
function b2Dot(a, b) {  
    return a.x * b.x + a.y * b.y;  
}  
   
function Normalize2(b) {  
    return Math.sqrt(b.x * b.x + b.y *b.y);  
}


function arrowPreSolve(contact,oldManifold){  
   var contactPoint = new b2Vec2;  
   var weldJointDef = new b2Joints.b2WeldJointDef;  
   
   if(contact.IsTouching()){  
       var bodyA =contact.GetFixtureA().GetBody();  
       var bodyB = contact.GetFixtureB().GetBody();  
       var objA = bodyA.GetUserData();  
       var objB = bodyB.GetUserData();  
       if (objA.name=="arrow" &&objB.name=="arrow") {  
           for (var j = bodyA.GetJointList(); j; j=j.next) {  
               bodyA.GetWorld().DestroyJoint(j.joint);  
           }  
           for (j=bodyB.GetJointList(); j; j=j.next) {  
               bodyB.GetWorld().DestroyJoint(j.joint);  
           }  
       }  
   
       if (objA.name=="arrow" &&objB.name=="target") {  
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


/*Util 用于获得canvas的偏移坐标*/
//http://js-tut.aardon.de/js-tut/tutorial/position.html  
function getElementPosition(element) {  
    var elem=element, tagname="",x=0, y=0;  
    while((typeof(elem) =="object") && (typeof(elem.tagName) != "undefined")){  
        y += elem.offsetTop;  
        x += elem.offsetLeft;  
        tagname = elem.tagName.toUpperCase();  
        if(tagname == "BODY"){  
            elem=0;  
        }  
        if(typeof(elem) =="object"){  
            if(typeof(elem.offsetParent) =="object"){  
                elem = elem.offsetParent;  
            }  
        }  
    }  
    return {x: x, y: y};  
}  

/*设置能量*/
/*
function onMouseDown(e){  
    if(arrowGame.state == arrowGame.STATE_PLAY){  
        if(allowCreateArrow()) {  
            arrowGame.chargeTaskID =setInterval(calculateStrength, 25);  
        }  
    }  
}  
function onMouseUp(e) {  
    if(arrowGame.state == arrowGame.STATE_PLAY){  
        // Only one arrow in gaming.  
        if(allowCreateArrow()) {  
           createArrow(e.clientX-canvasPosition.x,e.clientY-canvasPosition.y,arrowGame.power);  
           clearInterval(arrowGame.chargeTaskID);  
            arrowGame.power = 0;  
        }  
    }  
}  
function calculateStrength() {        
    arrowGame.power++;  
    arrowGame.powerBar.style.width =arrowGame.power*10 + "px";  
   
    if(arrowGame.powerBar.style.width =="300px"){  
        clearInterval(arrowGame.chargeTaskID);  
    }  
}  
*/



 