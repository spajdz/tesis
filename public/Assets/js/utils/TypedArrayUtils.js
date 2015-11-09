
THREE.TypedArrayUtils = {};

/**
 * In-place quicksort for typed arrays (e.g. for Float32Array)
 * provides fast sorting
 * useful e.g. for a custom shader and/or BufferGeometry
 *
 * @author Roman Bolzern <roman.bolzern@fhnw.ch>, 2013
 * @author I4DS http://www.fhnw.ch/i4ds, 2013
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 *
 * Complexity: http://bigocheatsheet.com/ see Quicksort
 *
 * Example: 
 * points: [x, y, z, x, y, z, x, y, z, ...]
 * eleSize: 3 //because of (x, y, z)
 * orderElement: 0 //order according to x
 */

 var qScalls=0;
function verifier(points, elements){
	var j=0;
	var bool=true;
	for (var i=0;i<points.length;i+=3){
		if( ( (points[i+0]-elements[j].position.x)>1.0 ) &&
			( (points[i+1]-elements[j].position.y)>1.0 ) &&
			( (points[i+2]-elements[j].position.z)>1.0 ) ){
			//console.log(qScalls,i,"/",points.length ,j,"/", elements.length, "[",points[i+0],points[i+1],points[i+2],"]",elements[j].position);
			bool= false;
		}
		j++;
	}
	return bool;
}



function swapVerifier(points, elements,i,j){
	
	if( ( 	( (points[i*3+0]-elements[i].position.x)>1.0 ) &&
			( (points[i*3+1]-elements[i].position.y)>1.0 ) &&
			( (points[i*3+2]-elements[i].position.z)>1.0 ) 
		)	
		&&
		( 	( (points[j*3+0]-elements[j].position.x)>1.0 ) &&
			( (points[j*3+1]-elements[j].position.y)>1.0 ) &&
			( (points[j*3+2]-elements[j].position.z)>1.0 ) )	){
		//console.log(points,elements,i,j);
		return false;
	}
	return true;
}

THREE.TypedArrayUtils.simpleOrder = function ( arr, eleSize, orderElement, elements){
	
	var swapElements= function(a,b){
		for ( y = 0; y < eleSize; y ++ ) {
			var tmp= new Float32Array(1);
			tmp = arr[ a  + y ];
			arr[ a  + y ]=arr[ b  + y ];
			arr[ b  + y ]=tmp;
		}
		var tempswap=elements[a/eleSize];
		elements[a/eleSize]=elements[b/eleSize];
		elements[b/eleSize]=tempswap;
	};
	//console.log("begin",arr.length);

	for (var i=orderElement;i<arr.length-eleSize;i+=eleSize){
		var min=i;
		for(var j=i+eleSize;j<arr.length;j+=eleSize){
			//console.log(i,j);
			if(arr[i]>arr[j]){
				if(arr[j]<arr[min]){
					min=j;
				}
			}
		}
		swapElements(i-orderElement,min-orderElement);
		//console.log("mid",j,arr.length);
	}
	//console.log("end");
	//console.log(orderElement,arr);
	//console.log(verifier(arr,elements));
	return arr;
}

THREE.TypedArrayUtils.quicksortIP = function ( arr, eleSize, orderElement, elements ) {
	//console.log(arr,eleSize,orderElement,elements);
	qScalls++;
	var stack = [];
	var sp = -1;
	var left = 0;
	var right = arr.length / eleSize - 1;
	var  x = 0, y = 0;


	var swapF = function ( a, b ) {
		//a *= eleSize; b *= eleSize;
		//if(swapVerifier(arr, elements,a,b)){
			for ( y = 0; y < eleSize; y ++ ) {
				var tmp= new Float32Array(1);
				tmp = arr[ a * eleSize + y ];
				arr[ a * eleSize + y ]=arr[ b * eleSize + y ];
				arr[ b * eleSize + y ]=tmp;

			}
			var tempswap=elements[a];
			elements[a]=elements[b];
			elements[b]=tempswap;
			verifier(arr, elements)
			/*if(qScalls==1){
				console.log(qScalls,"[",arr[a*eleSize],arr[a*eleSize+1],arr[a*eleSize+2],"]",elements[a].position);
				console.log(qScalls,"[",arr[b*eleSize],arr[b*eleSize+1],arr[b*eleSize+2],"]",elements[b].position);
			}*/
		/*}else */if(!swapVerifier(arr, elements,a,b)){
			console.log("[",arr[a*eleSize],arr[a*eleSize+1],arr[a*eleSize+2],"]  ", elements[a].position);
			console.log("[",arr[b*eleSize],arr[b*eleSize+1],arr[b*eleSize+2],"]  ", elements[b].position);
		}
	};
	
	var i, j, swap = new Float32Array( eleSize ), temp = new Float32Array( eleSize ),tempElem;
	//var temp;
	while ( true ) {
		//console.log(temp);
		if ( right - left <= 25 ) {
			console.log("original", arr);
			for ( j= left + 1; j <= right; j ++ ) {

				for ( x = 0; x < eleSize; x ++ ) {
			
					swap[ x ] = arr[ j * eleSize + x ];

				}
				tempElem=elements[j];
				i = j - 1;
				
				while ( i >= left && arr[ i * eleSize + orderElement ] > swap[orderElement ] ) {
					console.log("inside while",arr);
					for ( x = 0; x < eleSize; x ++ ) {

						arr[ ( i + 1 ) * eleSize + x ] = arr[ i * eleSize + x ];

					}
					//swapF(i+1,i);
					elements[i+1]=elements[i];

					i --;

				}

				for ( x = 0; x < eleSize; x ++ ) {

					arr[ ( i + 1 ) * eleSize + x ] = swap[ x ];

				}

				elements[i+1]=tempElem;
				//swapF(i+1,j);



			}
			
			if ( sp == -1 ) break;

			right = stack[ sp -- ]; //?
			left = stack[ sp -- ];

			//console.log("full pass",arr);
		} else {

			var median = ( left + right ) >> 1;

			i = left + 1;
			j = right;
	
			swapF( median, i );

			if ( arr[ left * eleSize + orderElement ] > arr[ right * eleSize + orderElement ] ) {
		
				swapF( left, right );
				
			}

			if ( arr[ i * eleSize + orderElement ] > arr[ right * eleSize + orderElement ] ) {
		
				swapF( i, right );
		
			}

			if ( arr[ left * eleSize + orderElement ] > arr[ i * eleSize + orderElement ] ) {
		
				swapF( left, i );
			
			}

			for ( x = 0; x < eleSize; x ++ ) {
				//console.log(temp,i,eleSize,x,i*eleSize+x)
				temp[ x ] = arr[ i * eleSize + x ];

			}
			
			while ( true ) {
				
				do i ++; while ( arr[ i * eleSize + orderElement ] < temp[ orderElement ] );
				do j --; while ( arr[ j * eleSize + orderElement ] > temp[ orderElement ] );
				
				if ( j < i ) break;
		
				swapF( i, j );
			
			}

			for ( x = 0; x < eleSize; x ++ ) {

				arr[ ( left + 1 ) * eleSize + x ] = arr[ j * eleSize + x ];
				arr[ j * eleSize + x ] = temp[ x ];

			}

			if ( right - i + 1 >= j - left ) {

				stack[ ++ sp ] = i;
				stack[ ++ sp ] = right;
				right = j - 1;

			} else {

				stack[ ++ sp ] = left;
				stack[ ++ sp ] = j - 1;
				left = i;

			}

		}

	}
	/*if(!(verifier(arr,elements))){
		console.log(arr,elements);
	}*/
	/*if(!verifier(arr,elements)){
		console.log(orderElement);
		var st="[";
		for(var t=orderElement;t<arr.length;t+=3){
			st+=","+arr[t];
		}
		console.log(st);
	}*/
	//console.log("orderer call: ",qScalls,verifier(arr,elements));
	return arr;

};



/**
 * k-d Tree for typed arrays (e.g. for Float32Array), in-place
 * provides fast nearest neighbour search
 * useful e.g. for a custom shader and/or BufferGeometry, saves tons of memory
 * has no insert and remove, only buildup and neares neighbour search
 *
 * Based on https://github.com/ubilabs/kd-tree-javascript by Ubilabs
 *
 * @author Roman Bolzern <roman.bolzern@fhnw.ch>, 2013
 * @author I4DS http://www.fhnw.ch/i4ds, 2013
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 *
 * Requires typed array quicksort
 *
 * Example: 
 * points: [x, y, z, x, y, z, x, y, z, ...]
 * metric: function(a, b){	return Math.pow(a[0] - b[0], 2) +  Math.pow(a[1] - b[1], 2) +  Math.pow(a[2] - b[2], 2); }  //Manhatten distance
 * eleSize: 3 //because of (x, y, z)
 *
 * Further information (including mathematical properties)
 * http://en.wikipedia.org/wiki/Binary_tree
 * http://en.wikipedia.org/wiki/K-d_tree
 *
 * If you want to further minimize memory usage, remove Node.depth and replace in search algorithm with a traversal to root node (see comments at THREE.TypedArrayUtils.Kdtree.prototype.Node)
 */

 THREE.TypedArrayUtils.Kdtree = function ( points, metric, eleSize, elements ) {
	var self = this;
	
	var maxDepth = 0;
	//console.log(elements);
	var getPointSet = function ( points, pos ) {

		return points.subarray( pos * eleSize, pos * eleSize + eleSize );

	};

	//console.log(elements);
	function buildTree( points, depth, parent, pos, elements ) {
		//console.log(elements);
		var dim = depth % eleSize,
			median,
			node,
			plength = points.length / eleSize;

		if ( depth > maxDepth ) maxDepth = depth;
		
		if ( plength === 0 ) return null;
		if ( plength === 1 ) {
			//console.log("leaf",getPointSet( points, 0 ),elements[0].position);
			return new self.Node( getPointSet( points, 0 ), depth, parent, pos, elements[0],dim );

		}

		//THREE.TypedArrayUtils.quicksortIP( points, eleSize, dim, elements );
		
		THREE.TypedArrayUtils.simpleOrder( points, eleSize, dim, elements );
			/*THREE.TypedArrayUtils.simpleOrder( points, eleSize, 0, elements );
			THREE.TypedArrayUtils.simpleOrder( points, eleSize, 1, elements );
			THREE.TypedArrayUtils.simpleOrder( points, eleSize, 2, elements );
			return null;*/
		//THREE.TypedArrayUtils.quicksortIP( points, eleSize, 0, elements );

		
		/*console.log(points)
		for(var ind=0;ind<elements.length;ind++){
			console.log(elements[ind].position);
		}*/
		median = Math.floor( plength / 2 );
		//console.log(getPointSet( points, median ),elements[median].position);
		node = new self.Node( getPointSet( points, median ) , depth, parent, median + pos, elements[median],dim);
		node.left = buildTree( points.subarray( 0, median * eleSize), depth + 1, node, pos , elements.slice(0,median));
		node.right = buildTree( points.subarray( ( median + 1 ) * eleSize, points.length ), depth + 1, node, pos + median + 1, elements.slice(median+1,points.length) );

		return node;
	
	}
	this.root = buildTree( points, 0, null, 0, elements );
		
	this.getMaxDepth = function () { return maxDepth; };
	
	this.nearest = function ( point, maxNodes , maxDistance ) {
	
		 /* point: array of size eleSize 
			maxNodes: max amount of nodes to return 
			maxDistance: maximum distance to point result nodes should have
			condition (not implemented): function to test node before it's added to the result list, e.g. test for view frustum
		*/

		var i,
			result,
			bestNodes;

		bestNodes = new THREE.TypedArrayUtils.Kdtree.BinaryHeap(

			function ( e ) { return -e[ 1 ]; }

		);

		function nearestSearch( node ) {

			var bestChild,
				dimension = node.depth % eleSize,
				ownDistance = metric(point, node.obj),
				linearDistance = 0,
				otherChild,
				i,
				linearPoint = [];

			function saveNode( node, distance ) {

				bestNodes.push( [ node, distance ] );

				if ( bestNodes.size() > maxNodes ) {

					bestNodes.pop();

				}

			}

			for ( i = 0; i < eleSize; i += 1 ) {

				if ( i === node.depth % eleSize ) {

					linearPoint[ i ] = point[ i ];

				} else {

					linearPoint[ i ] = node.obj[ i ];

				}

			}

			linearDistance = metric( linearPoint, node.obj );

			// if it's a leaf

			if ( node.right === null && node.left === null ) {

				if ( bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[ 1 ] ) {

					saveNode( node, ownDistance );

				}

				return;

			}

			if ( node.right === null ) {

				bestChild = node.left;

			} else if ( node.left === null ) {

				bestChild = node.right;

			} else {

				if ( point[ dimension ] < node.obj[ dimension ] ) {

					bestChild = node.left;

				} else {

					bestChild = node.right;

				}

			}

			// recursive search

			nearestSearch( bestChild );

			if ( bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[ 1 ] ) {

				saveNode( node, ownDistance );

			}

			// if there's still room or the current distance is nearer than the best distance

			if ( bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[ 1 ] ) {

				if ( bestChild === node.left ) {

					otherChild = node.right;

				} else {

					otherChild = node.left;

				}

				if ( otherChild !== null ) {

					nearestSearch( otherChild );

				}

			}

		}

		if ( maxDistance ) {

			for ( i = 0; i < maxNodes; i += 1 ) {

				bestNodes.push( [ null, maxDistance ] );

			}

		}

		nearestSearch( self.root );

		result = [];

		for ( i = 0; i < maxNodes; i += 1 ) {

			if ( bestNodes.content[ i ][ 0 ] ) {

				result.push( [ bestNodes.content[ i ][ 0 ], bestNodes.content[ i ][ 1 ] ] );

			}

		}
		
		return result;
	
	};
	
};

/**
 * If you need to free up additional memory and agree with an additional O( log n ) traversal time you can get rid of "depth" and "pos" in Node:
 * Depth can be easily done by adding 1 for every parent (care: root node has depth 0, not 1)
 * Pos is a bit tricky: Assuming the tree is balanced (which is the case when after we built it up), perform the following steps:
 *   By traversing to the root store the path e.g. in a bit pattern (01001011, 0 is left, 1 is right)
 *   From buildTree we know that "median = Math.floor( plength / 2 );", therefore for each bit...
 *     0: amountOfNodesRelevantForUs = Math.floor( (pamountOfNodesRelevantForUs - 1) / 2 );
 *     1: amountOfNodesRelevantForUs = Math.ceil( (pamountOfNodesRelevantForUs - 1) / 2 );
 *        pos += Math.floor( (pamountOfNodesRelevantForUs - 1) / 2 );
 *     when recursion done, we still need to add all left children of target node:
 *        pos += Math.floor( (pamountOfNodesRelevantForUs - 1) / 2 );
 *        and I think you need to +1 for the current position, not sure.. depends, try it out ^^
 *
 * I experienced that for 200'000 nodes you can get rid of 4 MB memory each, leading to 8 MB memory saved.
 */
THREE.TypedArrayUtils.Kdtree.prototype.Node = function ( obj, depth, parent, pos, element, dim ) {
	//console.log(obj,element.position);

	this.obj = obj;
	this.left = null;
	this.right = null;
	this.parent = parent;
	this.depth = depth;
	this.pos = pos;
	/*my stuff*/
	this.position=element.position;
	/*this.position.x=obj[0];
	this.position.y=obj[1];
	this.position.z=obj[2];*/
	this.direction=element.direction;
	this.power=element.power;
	this.plane=dim;
	this.theta=element.theta;
	this.phi=element.phi;
	/*fmy stuff*/

}; 

/**
 * Binary heap implementation
 * @author http://eloquentjavascript.net/appendix2.htm
 */

THREE.TypedArrayUtils.Kdtree.BinaryHeap = function ( scoreFunction ) {

	this.content = [];
	this.scoreFunction = scoreFunction;

};

THREE.TypedArrayUtils.Kdtree.BinaryHeap.prototype = {

	push: function ( element ) {

		// Add the new element to the end of the array.
		this.content.push( element );

		// Allow it to bubble up.
		this.bubbleUp( this.content.length - 1 );

	},

	pop: function () {

		// Store the first element so we can return it later.
		var result = this.content[ 0 ];

		// Get the element at the end of the array.
		var end = this.content.pop();

		// If there are any elements left, put the end element at the
		// start, and let it sink down.
		if ( this.content.length > 0 ) {

			this.content[ 0 ] = end;
			this.sinkDown( 0 );

		}

		return result;

	},

	peek: function () {

		return this.content[ 0 ];

	},

	remove: function ( node ) {

		var len = this.content.length;

		// To remove a value, we must search through the array to find it.
		for ( var i = 0; i < len; i ++ ) {

			if ( this.content[ i ] == node ) {

				// When it is found, the process seen in 'pop' is repeated
				// to fill up the hole.
				var end = this.content.pop();

				if ( i != len - 1 ) {

					this.content[ i ] = end;

					if ( this.scoreFunction( end ) < this.scoreFunction( node ) ) {

						this.bubbleUp( i );

					} else {

						this.sinkDown( i );

					}

				}

				return;

			}

		}

		throw new Error( "Node not found." );

	},

	size: function () {

		return this.content.length;

	},

	bubbleUp: function ( n ) {

		// Fetch the element that has to be moved.
		var element = this.content[ n ];

		// When at 0, an element can not go up any further.
		while ( n > 0 ) {

			// Compute the parent element's index, and fetch it.
			var parentN = Math.floor( ( n + 1 ) / 2 ) - 1,
				parent = this.content[ parentN ];

			// Swap the elements if the parent is greater.
			if ( this.scoreFunction( element ) < this.scoreFunction( parent ) ) {

				this.content[ parentN ] = element;
				this.content[ n ] = parent;

				// Update 'n' to continue at the new position.
				n = parentN;

			} else {

				// Found a parent that is less, no need to move it further.
				break;

			}

		}

	},

	sinkDown: function ( n ) {

		// Look up the target element and its score.
		var length = this.content.length,
			element = this.content[ n ],
			elemScore = this.scoreFunction( element );

		while ( true ) {

			// Compute the indices of the child elements.
			var child2N = ( n + 1 ) * 2, child1N = child2N - 1;

			// This is used to store the new position of the element, if any.
			var swap = null;

			// If the first child exists (is inside the array)...
			if ( child1N < length ) {

				// Look it up and compute its score.
				var child1 = this.content[ child1N ],
					child1Score = this.scoreFunction( child1 );

				// If the score is less than our element's, we need to swap.
				if ( child1Score < elemScore ) swap = child1N;

			}

			// Do the same checks for the other child.
			if ( child2N < length ) {

				var child2 = this.content[ child2N ],
					child2Score = this.scoreFunction( child2 );

				if ( child2Score < ( swap === null ? elemScore : child1Score ) ) swap = child2N;

			}

			// If the element needs to be moved, swap it, and continue.
			if ( swap !== null ) {

				this.content[ n ] = this.content[ swap ];
				this.content[ swap ] = element;
				n = swap;

			} else {

				// Otherwise, we are done.
				break;

			}

		}

	}

};