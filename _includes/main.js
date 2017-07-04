var sidebar = document.getElementById('sidebar'),
	lastActive;

sidebar.addEventListener("click", function()
{
	if (lastActive)
		lastActive.classList.remove('active');

	(lastActive = event.target).classList.add('active');
});
