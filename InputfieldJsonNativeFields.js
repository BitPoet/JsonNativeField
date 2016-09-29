
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

	function insertRow(inpid, wrapel) {
		var cnt = $(wrapel).find('tr').length + 1;

		var $name = $(wrapel).find('#' + inpid + '_name_new');
		var $value = $(wrapel).find('#' + inpid + '_value_new');

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
		
		var $row = $('<tr>', {
			role:		'row',
		}).append(
			$('<td>').append(
				$('<input>', {
					type:		'text',
					id:			'Inputfield_Inputfield_testjson_name_' + cnt,
					class:		'InputfieldJsonNativeMonitor InputfieldJsonNativeName',
					attr:		{
						size:		40
					},
					value:		$name.val()
				})
			),
			$('<td>').append(
				$('<input>', {
					type:		'text',
					id:			'Inputfield_Inputfield_testjson_value_' + cnt,
					class:		'InputfieldJsonNativeMonitor InputfieldJsonNativeValue',
					attr:		{
						size:		40
					},
					value:		$value.val()
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
});
