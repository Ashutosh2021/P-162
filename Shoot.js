AFRAME.registerComponent("ball",{
    init:function(){
        this.shootBall()
    },

    shootBall:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                const ballEl= document.createElement("a-entity")
                ballEl.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.5
                })
                ballEl.setAttribute("material",{color:"black"})

                var camera = document.querySelector("#camera")
                var pos = camera.getAttribute("position")

                ballEl.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                })

                var direction= new THREE.Vector3()
                var cam = document.querySelector("#camera").object3D
                cam.getWorldDirection(direction)

                ballEl.setAttribute("velocity",direction.multiplyScalar(-10))
                ballEl.setAttribute("dynamic-body",{shape:"sphere",mass:10})

                ballEl.addEventListener("collide",this.removeBall)
                
                var scene = document.querySelector("#scene")
                scene.appendChild(ballEl)
            }
        })
    },

    removeBall:function(e){

        var element=e.detail.target.el ;
        var elementHit = e.detail.body.el ;

        if(elementHit.id.includes("pin")){

            var impulse= new CANNON.Vec3(0,1,-15);
            var worldPoint=new CANNON.Vec3().copy(
                elementHit.getAttribute("position")
            )

            elementHit.body.applyForce(impulse,worldPoint);
            element.removeEventListener("collide",this.removeBall);

            var scene = document.querySelector("#scene");
            scene.removeChild(element);
        }

    }

    
})