<template>
	<div>
		 <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value="searchText">
                <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
           </form>
           <div class="" v-if="searching">
           		<ul class="list-group">
				  <li class="list-group-item">Cras justo odio</li>
				  <li class="list-group-item">Dapibus ac facilisis in</li>
				  <li class="list-group-item">Morbi leo risus</li>
				  <li class="list-group-item">Porta ac consectetur ac</li>
				  <li class="list-group-item">Vestibulum at eros</li>
				</ul>
           </div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				searching: false
			}
		},
		
	}
</script>