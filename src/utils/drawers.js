
function draw_tracess(data, pars){


	var items = data.split("\n").map(function(el){ return el.split(" ");});
					items = items.filter(item => item.length > 1);

					items = items.map(function(elem) {

						// console.log(elem);
						elem = elem.filter(e => e.localeCompare("")!=0);

						return elem.map(function(elem2) {
							return parseFloat(elem2);
						});
						
					});

	var num_segs = items.length;

	var material = new THREE.LineBasicMaterial({
		color: 0xffff00,
		linewidth: 100
	});

	let pointer_lines = new Float32Array( num_segs * 6 );
	for (let i=0; i<num_segs; i++){

		pointer_lines[i*6]   = 0;
		pointer_lines[i*6+1] = 0;
		pointer_lines[i*6+2] = 0;
		pointer_lines[i*6+3] = items[i][0]/pars.radius;
		pointer_lines[i*6+4] = items[i][1]/pars.radius;
		pointer_lines[i*6+5] = items[i][2]/pars.radius;


		let points = [];
		// points.push( new THREE.Vector3( 0/pars.radius, 0/pars.radius, 0/pars.radius ) );
		for (let j=0; j<items[i].length; j+=3){
			points.push( new THREE.Vector3( items[i][j]/pars.radius, items[i][j+1]/pars.radius, items[i][j+2]/pars.radius ) );

		}
		console.log(points)
		var geometry = new THREE.BufferGeometry().setFromPoints( points );
		var line = new THREE.Line( geometry, material );
		pars.scene.add( line );

		// drawing the pointer lines from center to starting position
		var geometry_ptr = new THREE.BufferGeometry();
		var material_ptr = new THREE.LineBasicMaterial( { color: 0xffff00 } );
		geometry_ptr.setAttribute( 'position', new THREE.Float32BufferAttribute( pointer_lines, 3 ) );
		geometry_ptr.computeBoundingSphere();
		pars.pointer_lines = new THREE.LineSegments( geometry_ptr, material_ptr );
		pars.scene.add( pars.pointer_lines );
		pars.pointer_lines.visible = false;
	}

	

}

function draw_lines(data, pars, items_vert){

			var items = data.split("\n").map(function(el){ return el.split(" ");});
					items = items.filter(item => item.length > 1);

					items = items.map(function(elem) {

						// console.log(elem);
						elem = elem.filter(e => e.localeCompare("")!=0);

						return elem.map(function(elem2) {
							return parseFloat(elem2);
						});
						
					});

			console.log(items_vert[items[0][0]]);

			var geometry = new THREE.BufferGeometry();
			var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );


			let num_lines = items.length;
			// num_lines = 10000;

			var positions = new Float32Array( num_lines * 6 );
			var colors = new Float32Array( num_lines * 3 );
			for (let i=0; i< num_lines; i++){

				// console.log(items[i], items_vert[items[i][0]])
				positions[i*6]   = items_vert[items[i][0]-1][0]/pars.radius;
				positions[i*6+1] = items_vert[items[i][0]-1][1]/pars.radius;
				positions[i*6+2] = items_vert[items[i][0]-1][2]/pars.radius;
				positions[i*6+3] = items_vert[items[i][1]-1][0]/pars.radius;
				positions[i*6+4] = items_vert[items[i][1]-1][1]/pars.radius;
				positions[i*6+5] = items_vert[items[i][1]-1][2]/pars.radius;

				// colors [i*3]   =  ( i / num_lines ) + 0.5;
				// colors [i*3+1] =  ( i / num_lines ) + 0.5;
				// colors [i*3+2] =  ( i / num_lines ) + 0.5;


				
				
			}
			geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
				// geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

				geometry.computeBoundingSphere();

				line = new THREE.LineSegments( geometry, material );
				pars.scene.add( line );
			

			

}


function draw_points(data, radius, PARTICLE_SIZE, scene, div_factor, pars, draw){
					var items = data.split("\n").map(function(el){ return el.split(" ");});
					items = items.filter(item => item.length > 1);

					items = items.map(function(elem) {

						// console.log(elem);
						elem = elem.filter(e => e.localeCompare("")!=0);

						return elem.map(function(elem2) {
							return parseFloat(elem2);
						});
						
					});

					pars.items = items;

					if (draw===true){

						let num_verts = items.length
						console.log(num_verts)
						var positions = new Float32Array( num_verts*3 );
						var colors = new Float32Array( num_verts*3);
						var sizes = new Float32Array( num_verts );


						var color = new THREE.Color();
						let count = 0;
						let max_partid = 1;
						for (let i=0; i<num_verts; i+=1){
							let partid = parseInt(items[i][3]);
							if (max_partid<partid)
								max_partid = max_partid;
						}
						max_partid += 1;
						
						for (let i=0; i<num_verts; i+=1){

								// var dotGeometry = new THREE.Geometry();
								// dotGeometry.vertices.push(new THREE.Vector3( items[i][0]/radius, items[i][1]/radius, items[i][2]/radius));
								// var dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
								// var dot = new THREE.Points( dotGeometry, dotMaterial );
								// scene.add( dot );


								positions[i*3] = items[i][0]/radius;
								positions[i*3+1] = items[i][1]/radius;
								positions[i*3+2] = items[i][2]/radius;
								let partid = items[i][3];
								if (Math.pow(-6352390-items[i][0],2)+Math.pow(-447879-items[i][1],2)+(Math.pow(197714-items[i][2],2))<Math.pow(5524190.98744,2)){
									color.setHSL( 0.01 + 0.1 * ( partid/max_partid), 1.0, 0.5 );
									count += 1;
								}
								else{
									color.setHSL( 0.5, 0.1, 0.9 );
								}
	 							color.toArray( colors, i * 3 );

								// console.log(( i / num_verts ), i, num_verts);

								// colors[i] = 0.9;
								// colors[i+1] = 0;
								// colors[i+2] = 0;
								sizes[ i ] = PARTICLE_SIZE * 0.5;

						}
						console.log("selectedCount", count)

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


						pars.particles = new THREE.Points( geometry, material );
						scene.add( pars.particles );

						var geometry = new THREE.SphereGeometry( div_factor - 0.02*div_factor, 100, 100 );
						var material = new THREE.MeshBasicMaterial( {color: 0x111111} );
						pars.sphere = new THREE.Mesh( geometry, material );
						scene.add( pars.sphere );
					}

					return items;

}

