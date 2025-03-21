export type GithubPRResponse = {
	url: string;
	id: number;
	node_id: string;
	html_url: string;
	diff_url: string;
	patch_url: string;
	issue_url: string;
	number: number;
	state: string;
	locked: boolean;
	title: string;
	user: {
		login: string;
		id: number;
		node_id: string;
		avatar_url: string;
		gravatar_id: string;
		url: string;
		html_url: string;
		followers_url: string;
		following_url: string;
		gists_url: string;
		starred_url: string;
		subscriptions_url: string;
		organizations_url: string;
		repos_url: string;
		events_url: string;
		received_events_url: string;
		type: string;
		user_view_type: string;
		site_admin: boolean;
	};
	body: string;
	created_at: string;
	updated_at: string;
	closed_at: string | null;
	merged_at: string | null;
	merge_commit_sha: string;
	assignee: null;
	assignees: any[];
	requested_reviewers: {
		login: string;
		id: number;
		node_id: string;
		avatar_url: string;
		gravatar_id: string;
		url: string;
		html_url: string;
		followers_url: string;
		following_url: string;
		gists_url: string;
		starred_url: string;
		subscriptions_url: string;
		organizations_url: string;
		repos_url: string;
		events_url: string;
		received_events_url: string;
		type: string;
		user_view_type: string;
		site_admin: boolean;
	}[];
	requested_teams: any[];
	labels: any[];
	milestone: null;
	draft: boolean;
	commits_url: string;
	review_comments_url: string;
	review_comment_url: string;
	comments_url: string;
	statuses_url: string;
	head: {
		label: string;
		ref: string;
		sha: string;
		user: {
			login: string;
			id: number;
			node_id: string;
			avatar_url: string;
			gravatar_id: string;
			url: string;
			html_url: string;
			followers_url: string;
			following_url: string;
			gists_url: string;
			starred_url: string;
			subscriptions_url: string;
			organizations_url: string;
			repos_url: string;
			events_url: string;
			received_events_url: string;
			type: string;
			user_view_type: string;
			site_admin: boolean;
		};
		repo: {
			id: number;
			node_id: string;
			name: string;
			full_name: string;
			private: boolean;
			owner: {
				login: string;
				id: number;
				node_id: string;
				avatar_url: string;
				gravatar_id: string;
				url: string;
				html_url: string;
				followers_url: string;
				following_url: string;
				gists_url: string;
				starred_url: string;
				subscriptions_url: string;
				organizations_url: string;
				repos_url: string;
				events_url: string;
				received_events_url: string;
				type: string;
				user_view_type: string;
				site_admin: boolean;
			};
			html_url: string;
			description: string;
			fork: boolean;
			url: string;
			forks_url: string;
			keys_url: string;
			collaborators_url: string;
		};
	};
};
