import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost , deletePost } from "../api";

function PostItem({ post, onLike, onDelete }) {
  const queryClient = useQueryClient();
  
  const refresh = () => queryClient.invalidateQueries({
      queryKey: ['posts'] });

      const like = useMutation({                                  // ③
        mutationFn: likePost,
        onSuccess: refresh,
      });
      const delMutation = useMutation({                           // ④
        mutationFn: deletePost,
        onSuccess: refresh,
      });

  const busy = like.isPending || delMutation.isPending;

  return (
    <li className="post-item">
      <div className="post-info">
        <strong>{post.title}</strong>
        <p>작성자 {post.author} · {post.date}</p>
      </div>
      <div className="post-actions">
        <button type="button" onClick={() => like.mutate(post)} disabled ={busy}>
          좋아요 {post.likes}
        </button>
        <button type="button" onClick={() => delMutation.mutate(post.id)} disabled ={busy}>
          삭제
        </button>
      </div>
    </li>
  );
}

export default PostItem;