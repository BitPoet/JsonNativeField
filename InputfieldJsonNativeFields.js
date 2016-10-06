
$(document).ready(function() {
	
	function updateJson(inpid, wrapel) {
		var $names = $(wrapel).find('.InputfieldJsonNativeName');
		var $types = $(wrapel).find('.InputfieldJsonNativeType');
		var $values = $(wrapel).find('.InputfieldJsonNativeValue');
		
		var jsobj = {};
		
		for(var i = 0; i < $names.length; i++) {
			if($names.eq(i).val()) {
				jsobj[$names.eq(i).val()] = {
					type:	$types.eq(i).val(),
					value:	$values.eq(i).val()
				};
			}
		}
		
		$('#' + inpid).val(JSON.stringify(jsobj));
	}

	function insertRow(inpidP, wrapel) {
		var cnt = $(wrapel).data('rowcount') + 1;
		$(wrapel).data('rowcount', cnt);
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
		
		var $newtypesel = $(config.jsonnative.typeselect);
		var prefix = $type.data('idprefix');
		$newtypesel.attr('id', inpid + '_type_' + cnt);
		$newtypesel.attr('name', inpid + '_type_' + cnt);
		$newtypesel.addClass('InputfieldJsonNativeType');
		$newtypesel.attr('data-idsuffix', cnt);
		$newtypesel.attr('data-idprefix', prefix);
		$newtypesel.val(selval);
		
		var newval = $value.val();
		var $newfld = $(config.jsonnative[selval]);
		$newfld.addClass('InputfieldJsonNativeMonitor InputfieldJsonNativeValue');
		$newfld.attr('id', inpid + '_value_' + cnt);
		$newfld.attr('name', inpid + '_value_' + cnt);
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
					title:		'Delete',
					html:		'<i class="fa fa-trash"> </i>'
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
		
		var selval = $selinp.val();
		if(! selval) {
			selval = "text";
		}
		
		var $valuefield = $wrap.find('#' + $selinp.data('idprefix') + "_value_" + $selinp.data('idsuffix'));
		var curval = $valuefield.val();
		var curname = $valuefield.attr('name');
		var curid = $valuefield.attr('id');
		
		var $newinp = $(config.jsonnative[selval]);
		$newinp.attr('name', curname);
		$newinp.attr('id', curid);
		$newinp.val(curval);
		$valuefield.replaceWith($newinp);
		
		$valuefield.trigger('change');
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
