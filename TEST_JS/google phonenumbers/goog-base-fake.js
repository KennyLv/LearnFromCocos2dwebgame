/**
 *
 */
var COMPILED = false;

var goog = {
	provide : function(name) {
		var arrs = name.split(".");
		var parent = window;
		for(var i = 0; i < arrs.length; i++) {
			if(!parent[arrs[i]]) {
				parent[arrs[i]] = {};
			}
			parent = parent[arrs[i]];
		}
	},
	
	require : function(name) {
		return;
	},
	
	inherits : function(childCtor, parentCtor) {
	  /** @constructor */
	  function tempCtor() {};
	  tempCtor.prototype = parentCtor.prototype;
	  childCtor.superClass_ = parentCtor.prototype;
	  childCtor.prototype = new tempCtor();
	  /** @override */
	  childCtor.prototype.constructor = childCtor;
	},
	
	addSingletonGetter : function(ctor) {
	  ctor.getInstance = function() {
		if (ctor.instance_) {
		  return ctor.instance_;
		}
		if (goog.DEBUG) {
		  // NOTE: JSCompiler can't optimize away Array#push.
		  goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
		}
		return ctor.instance_ = new ctor;
	  };
	},
	
	instantiatedSingletons_ : [],
	
	base : function(me, opt_methodName, var_args) {
	  var caller = arguments.callee.caller;
	  if (caller.superClass_) {
		// This is a constructor. Call the superclass constructor.
		return caller.superClass_.constructor.apply(
			me, Array.prototype.slice.call(arguments, 1));
	  }

	  var args = Array.prototype.slice.call(arguments, 2);
	  var foundCaller = false;
	  for (var ctor = me.constructor;
		   ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
		if (ctor.prototype[opt_methodName] === caller) {
		  foundCaller = true;
		} else if (foundCaller) {
		  return ctor.prototype[opt_methodName].apply(me, args);
		}
	  }

	  // If we did not find the caller in the prototype chain,
	  // then one of two things happened:
	  // 1) The caller is an instance method.
	  // 2) This method was not called by the right caller.
	  if (me[opt_methodName] === caller) {
		return me.constructor.prototype[opt_methodName].apply(me, args);
	  } else {
		throw Error(
			'goog.base called from a method of one name ' +
			'to a method of a different name');
	  }
	},
	
	isArray : function(val) {
	  return goog.typeOf(val) == 'array';
	},
	
	typeOf : function(value) {
	  var s = typeof value;
	  if (s == 'object') {
		if (value) {
		  // Check these first, so we can avoid calling Object.prototype.toString if
		  // possible.
		  //
		  // IE improperly marshals tyepof across execution contexts, but a
		  // cross-context object will still return false for "instanceof Object".
		  if (value instanceof Array) {
			return 'array';
		  } else if (value instanceof Object) {
			return s;
		  }

		  // HACK: In order to use an Object prototype method on the arbitrary
		  //   value, the compiler requires the value be cast to type Object,
		  //   even though the ECMA spec explicitly allows it.
		  var className = Object.prototype.toString.call(
			  /** @type {Object} */ (value));
		  // In Firefox 3.6, attempting to access iframe window objects' length
		  // property throws an NS_ERROR_FAILURE, so we need to special-case it
		  // here.
		  if (className == '[object Window]') {
			return 'object';
		  }

		  // We cannot always use constructor == Array or instanceof Array because
		  // different frames have different Array objects. In IE6, if the iframe
		  // where the array was created is destroyed, the array loses its
		  // prototype. Then dereferencing val.splice here throws an exception, so
		  // we can't use goog.isFunction. Calling typeof directly returns 'unknown'
		  // so that will work. In this case, this function will return false and
		  // most array functions will still work because the array is still
		  // array-like (supports length and []) even though it has lost its
		  // prototype.
		  // Mark Miller noticed that Object.prototype.toString
		  // allows access to the unforgeable [[Class]] property.
		  //  15.2.4.2 Object.prototype.toString ( )
		  //  When the toString method is called, the following steps are taken:
		  //      1. Get the [[Class]] property of this object.
		  //      2. Compute a string value by concatenating the three strings
		  //         "[object ", Result(1), and "]".
		  //      3. Return Result(2).
		  // and this behavior survives the destruction of the execution context.
		  if ((className == '[object Array]' ||
			   // In IE all non value types are wrapped as objects across window
			   // boundaries (not iframe though) so we have to do object detection
			   // for this edge case
			   typeof value.length == 'number' &&
			   typeof value.splice != 'undefined' &&
			   typeof value.propertyIsEnumerable != 'undefined' &&
			   !value.propertyIsEnumerable('splice')

			  )) {
			return 'array';
		  }
		  // HACK: There is still an array case that fails.
		  //     function ArrayImpostor() {}
		  //     ArrayImpostor.prototype = [];
		  //     var impostor = new ArrayImpostor;
		  // this can be fixed by getting rid of the fast path
		  // (value instanceof Array) and solely relying on
		  // (value && Object.prototype.toString.vall(value) === '[object Array]')
		  // but that would require many more function calls and is not warranted
		  // unless closure code is receiving objects from untrusted sources.

		  // IE in cross-window calls does not correctly marshal the function type
		  // (it appears just as an object) so we cannot use just typeof val ==
		  // 'function'. However, if the object has a call property, it is a
		  // function.
		  if ((className == '[object Function]' ||
			  typeof value.call != 'undefined' &&
			  typeof value.propertyIsEnumerable != 'undefined' &&
			  !value.propertyIsEnumerable('call'))) {
			return 'function';
		  }


		} else {
		  return 'null';
		}

	  } else if (s == 'function' && typeof value.call == 'undefined') {
		// In Safari typeof nodeList returns 'function', and on Firefox
		// typeof behaves similarly for HTML{Applet,Embed,Object}Elements
		// and RegExps.  We would like to return object for those and we can
		// detect an invalid function by making sure that the function
		// object has a call method.
		return 'object';
	  }
	  return s;
	}
};

/**
 * Returns true if the specified value is not |undefined|.
 * WARNING: Do not use this to test if an object has a property. Use the in
 * operator instead.  Additionally, this function assumes that the global
 * undefined variable has not been redefined.
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is defined.
 */
goog.isDef = function(val) {
  return val !== undefined;
};