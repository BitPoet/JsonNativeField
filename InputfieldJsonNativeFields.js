
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
		var cnt = $(wrapel).find('tr').length + 1;
		var inpid = $(wrapel).data('id');

		var $name = $(wrapel).find('#' + inpid + '_name_new');
		var $type = $(wrapel).find('#' + inpid + '_type_new');
		var $value = $(wrapel).find('#' + inpid + '_value_new');
		
		if(!$name.val()) {
			alert(config.jsonnative.messages.name_not_empty);
			return;
		}
		
		var exists = false;
		$(wrapel).find('table').find('.InputfieldJsonNativeName').each(function(idx, inpel) {
			if($(inpel).val() == $name.val()) {
				exists = true;
			}
		});
		
		if(exists) {
			alert(config.jsonnative.messages.name_exists + ": " + $name.val());
			return;
		}
		
		var selval = $type.val();
		if(! selval) {
			selval = 'text';
		}
		
		var $newtypesel = $(config.jsonnative.typeselect, {
			id:			inpid + '_type_' + cnt,
			data:		{
				idsuffix:		$type.data('idsuffix'),
				idprefix:		$type.data('idprefix')
			}
		});
		$newtypesel.val(selval);
		
		var newval = $value.val();
		var $newfld = $(config.jsonnative[selval], {
			id:			inpid + '_value_' + cnt,
			class:		'InputfieldJsonNativeMonitor InputfieldJsonNativeValue'
		});
		$newfld.val(newval);
		
		var $row = $('<tr>', {
			role:		'row',
		}).append(
			$('<td>').append(
				$('<input>', {
					type:		'text',
					id:			inpid + '_name_' + cnt,
					class:		'InputfieldJsonNativeMonitor InputfieldJsonNativeName',
					attr:		{
						size:		40
					},
					value:		$name.val()
				})
			),
			$('<td>').append(
				$newtypesel
			),
			$('<td>').append(
				$newfld
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
		$(el).on('change', '.InputfieldJsonNativeMonitor', function(evt) {
			updateJson($(evt.delegateTarget).data('id'), evt.delegateTarget);
		});
		$(el).on('click', '.InputfieldJsonNativeAdd', function(evt) {
			insertRow($(evt.delegateTarget).data('id'), evt.delegateTarget);
		});
		$(el).on('click', '.InputfieldJsonNativeDelete', function(evt) {
			deleteRow($(evt.delegateTarget).data('id'), evt.delegateTarget, evt.currentTarget);
		});
		$(el).on('change', '.InputfieldJsonNativeType', function(evt) {
			switchType(evt.currentTarget, evt.delegateTarget);
		});
	});
});
