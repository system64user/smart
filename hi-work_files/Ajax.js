var Ajax = {
	call_ajax: function(url, param, func, sync)
	{
		var psync = (sync === false) ? sync : true;

		$.ajax({
			url: url,
			datatype: 'json',
			type: 'POST',
			async :	psync,
			data: param,
			success: function (data) {
				try
				{
					if(typeof data =='object')
					{
						func(data);
					}
					else
					{
						json_data = $.parseJSON(data);
						//json_data = JSON.parse(data); // ie7오류
						func(json_data);
					}

				}
				catch(e)
				{
					//console.log(e);
					json_data = "";
					func(json_data);
				}
			},
			error:function()
			{
				//window.alert('오류');
			}
		});
	}
}