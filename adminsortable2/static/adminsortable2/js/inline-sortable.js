// make tabular- and stacked inlines sortable
jQuery(function($) {
	$('div.inline-group.sortable').each(function() {
		var default_order_field = $(this).nextUntil('div.default_order_field').next().attr('default_order_field');
		var order_input_field = 'input[name$="-' + default_order_field + '"]';
		// first, try with tabluar inlines
		var tabular_inlines = $(this).find('div.tabular table');
		tabular_inlines.sortable({
			handle: $(this).find('tbody .drag'),
			items: 'tr.form-row.has_original',
			axis: 'y',
			scroll: true,
			cursor: 'ns-resize',
			containment: $(this).find('tbody'),
			tolerance: 'pointer',
			stop: function(event, dragged_rows) {
				var $result_list = $(this);
				$result_list.find('tbody tr').each(function(index) {
					$(this).removeClass('row1 row2').addClass(index % 2 ? 'row2' : 'row1');
				});
				$result_list.find('tbody tr.has_original').each(function(index) {
					$(this).find(order_input_field).val(index + 1);
				});
			},
			start: function(e, ui){
				ui.placeholder.height(ui.item.height());
				var sort = $(this).sortable('instance');
				sort.containment[3] += ui.helper.height() * 2 - sort.offset.click.top;
				sort.containment[1] -= sort.offset.click.top + ui.helper.height();
			}
		});
		if (tabular_inlines.length)
			return true;
		// else, try with stacked inlines
		$(this).sortable({
			handle: 'h3',
			items: 'div.inline-related.has_original',
			axis: 'y',
			scroll: true,
			cursor: 'ns-resize',
			tolerance: 'pointer',
			stop: function(event, dragged_rows) {
				var $result_list = $(this);
				$result_list.find('div.inline-related.has_original').each(function(index) {
					$(this).find(order_input_field).val(index + 1);
				});
			},
			start: function(e, ui){
				ui.placeholder.height(ui.item.height());
			}
		});
	});
});
