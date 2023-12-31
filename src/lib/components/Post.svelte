<script lang="ts">
	export let post: {
		id: string;
		authorId: string;
		title: string;
		body: string;
		createdAt: Date;
	};

	const createdAt = post.createdAt;
	const fullDate = `${createdAt.getDate()}.${
		createdAt.getMonth() + 1
	}.${createdAt.getFullYear()}, ${createdAt.getHours()}:${createdAt.getMinutes()}`;
</script>

<div class="card p-6">
	<p>{fullDate}</p>
	<h3 class="h3">{post.title}</h3>
	<p>{post.authorId}</p>
	<p>{post.body}</p>
</div>
