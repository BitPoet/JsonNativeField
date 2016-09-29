
$(document).ready(function() {
	
	function updateJson(inpid, wrapel) {
		var $names = $(wrapel).find('.InputfieldJsonNativeName');
		var $values = $(wrapel).find('.InputfieldJsonNativeValue');
		
		var jsobj = {};
		
		for(var i = 0; i < $names.length; i++) {
			if($names.eq(i).val()) {
				jsobj[$names.eq(i).val()] = $values.eq(i).val();
			}
		}
		
		$('#' + inpid).val(JSON.stringify(jsobj));
	}

	function insertRow(inpidP, wrapel) {
		console.dir(wrapel);
		var cnt = $(wrapel).find('tr').length + 1;
		var inpid = $(wrapel).data('id');
		console.log(inpid);

		var $name = $(wrapel).find('#' + inpid + '_name_new');
		console.dir($name);
		var $type = $(wrapel).find('#' + inpid + '_type_new');
		console.dir($type);
		var $value = $(wrapel).find('#' + inpid + '_value_new');
		console.dir($value);
		
		if(!$name.val()) {
			alert('Name must not be empty for new field');
			return;
		}
		
		var exists = false;
		$(wrapel).find('table').find('.InputfieldJsonNativeName').each(function(idx, inpel) {
			if($(inpel).val() == $name.val()) {
				exists = true;
			}
		});
		
		if(exists) {
			alert('A field with name "' + $name.val() + '" already exists');
			return;
		}
		
		var selval = $type.val();
		if(! selval) {
			selval = 'text';
		}
		
		var $row = $('<tr>', {
			role:		'row',
		}).append(
			$('<td>').append(
				$('<input>', {
					type:		'text',
					id:			'Inputfield_testjson_name_' + cnt,
					class:		'InputfieldJsonNativeMonitor InputfieldJsonNativeName',
					attr:		{
						size:		40
					},
					value:		$name.val()
				})
			),
			$('<td>').append(
				$(config.jsonnative.typeselect, {
					id:			'Inputfield_testjson_type_' + cnt,
					val:		selval
				})
			),
			$('<td>').append(
				$(config.jsonnative[selval], {
					id:			'Inputfield_testjson_value_' + cnt,
					class:		'InputfieldJsonNativeMonitor InputfieldJsonNativeValue',
					val:		$value.val(),
					data:		{
						idsuffix:		$type.data('idsuffix'),
						idprefix:		$type.data('idprefix')
					}
				})
			),
			$('<td>').append(
				$('<a>', {
					href:		'#',
					class:		'InputfieldJsonNativeDelete',
					html:		'<i class="fa fa-trash"> </i> Delete'
				})
			)
		);
		console.dir($row);
		var $lastrow = $(wrapel).find('table').append($row);
		
		$row.find('.InputfieldJsonNativeMonitor').each(function(idx, inp) {
			var idval = inpid;
			var wrapobj = wrapel;
			$(inp).on('change', function(evt) {
				updateJson(idval, wrapobj);
			});
		});
		
		$row.find('.InputfieldJsonNativeDelete').each(function(idx, inp) {
			var idval = inpid;
			var wrapobj = wrapel;
			$(inp).click(function(evt) {
				deleteRow(idval, wrapobj, evt.target);
			});
		});

		$name.val('');
		$value.val('');
		
		updateJson(inpid, wrapel);
	}
	
	function deleteRow(inpid, wrapel, tgt) {
		$(tgt).closest('tr').remove();
		updateJson(inpid, wrapel);
	}
	
	function switchType(selinp, wrap) {
		var $selinp = $(selinp);
		var $wrap = $(wrap);
		
		var value = $selinp.val();
		if(! value) {
			value = "text";
		}
		
		var $valuefield = $wrap.find('#' + $selinp.data('idprefix') + "_value_" + $selinp.data('idsuffix'));
		var curval = $valuefield.val();
		
		var $newinp = $(config.jsonnative[value]);
		$newinp.attr('id', $valuefield.attr('id'));
		$newinp.attr('name', $valuefield.attr('name'));
		$newinp.val(curval);
		$valuefield.replaceWith($newinp);
	}

	$('.InputfieldJsonNativeWrap').each(function(idx, el) {
		var jsonid = $(el).data('id');
		$(el).find('.InputfieldJsonNativeMonitor').each(function(idx, inp) {
			$(inp).on('change', function(evt) {
				updateJson(jsonid, el);
			});
		});
		$(el).find('.InputfieldJsonNativeAdd').each(function(idx, inp) {
			$(inp).on('click', function(evt) {
				insertRow(jsonid, el);
			});
		});
		$(el).find('.InputfieldJsonNativeDelete').each(function(idx, inp) {
			$(inp).click(function(evt) {
				deleteRow(jsonid, el, evt.target);
			});
		});
	});
	
	$('.InputfieldJsonNativeWrap').on('change', '.InputfieldJsonNativeType', function(evt) {
		switchType(evt.currentTarget, evt.delegateTarget);
	});
});
