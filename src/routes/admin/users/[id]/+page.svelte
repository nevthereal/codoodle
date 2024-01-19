<script lang="ts">
	import { marked } from 'marked';

	export let data;
	const user = data.user;
	const posts = data.user.posts;
</script>

<div class="flex gap-8 flex-col">
	<div>
		<h1 class="h1 mb-4">User Data:</h1>
		<ul>
			<li><span class="font-semibold">Id: </span>{user?.id}</li>
			<li><span class="font-semibold">Username: </span>{user?.username}</li>
			<li><span class="font-semibold">Email: </span>{user?.email}</li>
			<li><span class="font-semibold">Admin: </span>{user?.admin}</li>
		</ul>
	</div>
	<div>
		<h1 class="h1 mb-4">Posts</h1>
		<div class="table-container">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Post Id</th>
						<th>Title</th>
						<th>Body</th>
					</tr>
				</thead>
				<tbody>
					{#each posts as post}
						<tr>
							<td>{post.id}</td>
							<td>{post.title}</td>
							<td><div class="post-content">{@html marked(post.body)}</div></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
