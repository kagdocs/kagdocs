## Contributing to the community KAG documentation

KAGDocs uses [Markdown](https://guides.github.com/features/mastering-markdown/). Static pages are generated using [Jekyll](https://jekyllrb.com/), and hosted by Github Pages, using the [Aviator Jekyll template](https://github.com/CloudCannon/aviator-jekyll-template) by [CloudCannon](https://cloudcannon.com/) that was heavily modified afterwards.

### Testing KAG Docs locally

To test the documentation website locally, you will need to install the ruby `bundler`. Run `bundle` in the cloned repository, the dependencies should now install.  
Run `bundle exec jekyll serve`. Then, open your browser and enter `localhost:4000` to the address bar.  
Do note that Jekyll is capable of detecting file changes, and will regenerate the static pages properly. This doesn't apply for e.g. `_config.yml`.

### HTML/CSS/JS guidelines

JQuery has been removed from the dependencies and HTML changes have been performed to improve loading time and user experience. As for now, a single page is used for all of the documentation. The goal is to keep it so.

### Markdown guidelines

There is no particular restriction towards Markdown itself, though, do consider:

- Keep maximal coherency with the rest of the documentation. Avoid unnecessary headings.
- Code snippets are following this syntax:
```
	~~~ [highlighting]
		// ...
	~~~
```
The `cpp` syntax highlighting is used for Angelscript snippets.
- As for now, the documentation is split accross a few directories: `_script_api`, `_rest_api`
, `_tcpr` and `_documentation`. Each file represents one function, variable, class name, etc. or article (such as the TCPR documentation).
- As for the scripting API documentation, the format is as follows:
- The syntax for API entries is:
```
	---
	title: Class::signatureOfTheFunctionIfAny
	position: *to be defined - generally the number of the class as it appears in Object.txt, but consistent with the other fields of the same class; .1 for methods, .2 for variables, .3 for enum values, .0 for the class itself*
	type: *cl for class, fn for function, var for variable*
	description: Short description of the field
	right_code: |
	  ~~~ cpp
	    void signatureOfTheFunctionIfAny(float a, string b, int c)
	  ~~~
	  {: title="Signatures" }

	  Super duper example (KAG):
	  ~~~ cpp
	  	signatureOfTheFunctionIfAny(3.726f);
	  ~~~
	  {: title="Example"}

	  Example from TR:
	  ~~~ cpp
	  	signatureOfTheFunctionIfAny();
	  ~~~
	  {: title="Example"}
	---
	`float` a
	: Explain what parameter this is
	`string` b
	: Useful string thing
	`int` c
	: Team value

	In-depth description, if required.

	Some useful info, if required
	{: .info }

	Some useful warning, if required
	{: .warning }

	Warning, this is dangerous, this might break
	{: .error }

	Success info, if really required (but mostly unused)
	{: .success }

	A positive angle value will rotate the blob clockwise.
```
- Functions with different names but doing a similar task may be packed together.
- Warnings, errors, infos, etc for a function should come after the related in-depth description (if any).
- The filename standard is class_field, all lowercase.
