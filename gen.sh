rm public/slides-example/list.txt
names=$(ls ./public/slides-example/ | grep -E '\.(json|md|mdx)')
for t in $names; do {
	name=$(echo ./public/slides-example/$t)
#	count=$(grep -E '(-----|\},\{|\}, \{)' -- $name | wc -l)
	count=$(grep -E '(-----|\},\{)' -- $name | wc -l)
	echo $t $count >> public/slides-example/list.txt
}; done
cat ./public/slides-example/list.txt
