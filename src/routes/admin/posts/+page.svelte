<script lang="ts">
	import { marked } from 'marked';

	export let data;

	const posts = data.posts;
</script>

<div>
	<h1 class="h1 mb-4">Posts</h1>
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Post Id</th>
					<th>Author</th>
					<th>Title</th>
					<th>Body</th>
				</tr>
			</thead>
			<tbody>
				{#each posts as post}
					<tr>
						<td>{post.id}</td>
						<td><a href={`/admin/users/${post.author.id}`}>{post.author.username}</a></td>
						<td>{post.title}</td>
						<td><div class="post-content">{@html marked(post.body)}</div></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
