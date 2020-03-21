function draw_points(data, radius, PARTICLE_SIZE, scene, div_factor, pars){
	var items = data.split("\n").map(function(el){ return el.split(" ");});
					items = items.filter(item => item.length > 1);

					items = items.map(function(elem) {

						// console.log(elem);
						elem = elem.filter(e => e.localeCompare("")!=0);

						return elem.map(function(elem2) {
							return parseFloat(elem2);
						});
						
					});

					let num_verts = items.length
					console.log(num_verts)
					var positions = new Float32Array( num_verts*3 );
					var colors = new Float32Array( num_verts*3);
					var sizes = new Float32Array( num_verts );

					console.log(items[0])

					var color = new THREE.Color();
					
					for (let i=0; i<num_verts; i++){

							// var dotGeometry = new THREE.Geometry();
							// dotGeometry.vertices.push(new THREE.Vector3( items[i][0]/radius, items[i][1]/radius, items[i][2]/radius));
							// var dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
							// var dot = new THREE.Points( dotGeometry, dotMaterial );
							// scene.add( dot );


							positions[i*3] = items[i][0]/radius;
							positions[i*3+1] = items[i][1]/radius;
							positions[i*3+2] = items[i][2]/radius;

							color.setHSL( 0.01 + 0.1 * ( i / num_verts ), 1.0, 0.5 );
 							color.toArray( colors, i * 3 );

							// console.log(( i / num_verts ), i, num_verts);

							// colors[i] = 0.9;
							// colors[i+1] = 0;
							// colors[i+2] = 0;
							sizes[ i ] = PARTICLE_SIZE * 0.5;

					}

					var geometry = new THREE.BufferGeometry();
					geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
					geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
					geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

					var material = new THREE.ShaderMaterial( {

						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "textures/sprites/disc.png" ) }
						},
						vertexShader: document.getElementById( 'vertexshader' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

						alphaTest: 0.9

					} );

					//

					pars.particles = new THREE.Points( geometry, material );
					scene.add( pars.particles );

					var geometry = new THREE.SphereGeometry( div_factor - 0.02*div_factor, 100, 100 );
					var material = new THREE.MeshBasicMaterial( {color: 0x111111} );
					var sphere = new THREE.Mesh( geometry, material );
					scene.add( sphere );

					console.log(pars)

}

