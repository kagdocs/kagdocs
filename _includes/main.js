var sidebar = document.getElementById('sidebar');

sidebar.addEventListener("click", function()
{
	if (event.target.nodeName == "H6")
	{
		var ul = event.target.nextElementSibling;

		if (ul.style.display == "none")
		{
			event.target.classList.remove("folded");
			ul.style.display = "block";
		}
		else
		{
			event.target.classList.add("folded");
			ul.style.display = "none";
		}
	}
});
