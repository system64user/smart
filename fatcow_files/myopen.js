function myopen(filename,windowname,properties){
	mywindow = window.open(filename,windowname,properties);
	mywindow.self.focus();
}