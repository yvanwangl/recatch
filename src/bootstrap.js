export default function bootstrap(orm) {
    // Get the empty state according to our schema.
    const state = orm.getEmptyState();

    // Begin a mutating session with that state.
    // `state` will be mutated.
    const session = orm.mutableSession(state);

    // Model classes are available as properties of the
    // Session instance.
    const { Post, Comment } = session;

    // Todo's for `user`
   const comment = Comment.create({
        id: 0,
        content: 'safsf'
    });

    // Start by creating entities whose props are not dependent
    // on others.
    const post = Post.create({
        id: 0,
        author: '2343',
        content: '2343',
        publishDate: '2343',
        views: 33,
        //comments: [comment]
    });

    // Return the whole Redux initial state.
    return {
        orm: state,
        ui: {},
    };
}