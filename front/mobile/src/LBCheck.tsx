type bookmarkPost = {
  post: {
    id: string;
  };
};

type likePost = {
  id: string;
};

export const isBookmark = (bookmark: any, feed_id: string) => {
  for (let i = 0; i < bookmark.length; i++) {
    if (bookmark[i].post.id === feed_id) {
      return true;
    }
  }
  return false;
};

export const isLike = (like: any, feed_id: string) => {
  for (let i = 0; i < like.length; i++) {
    if (like[i].id === feed_id) {
      return true;
    }
  }
  return false;
};

export const isMembership = (list: any, author_id: string) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].node.creator.id === author_id) {
      const tmp = {state: true, tier: list[i].node.tier};
      return tmp;
    }
  }
  return {state: false, tier: ''};
};
