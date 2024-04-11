import React, { useState } from "react";
import { Box, Heading, Text, Image, Button, VStack, HStack, Textarea } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "Welcome to my Pixel Blog",
    content: "This is my first blog post. I hope you enjoy the retro pixel style!",
  },
  {
    id: 2,
    title: "Pixel Art Inspiration",
    content: "I love browsing pixel art for inspiration. Here are some of my favorite pieces...",
  },
];

const Index = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [showEditor, setShowEditor] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  const handleAddPost = () => {
    setShowEditor(true);
    setEditorTitle("");
    setEditorContent("");
    setEditPostId(null);
  };

  const handleEditPost = (postId) => {
    const post = posts.find((p) => p.id === postId);
    setEditorTitle(post.title);
    setEditorContent(post.content);
    setEditPostId(postId);
    setShowEditor(true);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  const handleSavePost = () => {
    if (editPostId) {
      setPosts(posts.map((p) => (p.id === editPostId ? { ...p, title: editorTitle, content: editorContent } : p)));
    } else {
      setPosts([...posts, { id: Date.now(), title: editorTitle, content: editorContent }]);
    }
    setShowEditor(false);
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8} textAlign="center">
        My Pixel Blog
      </Heading>

      <Box mb={8} position="relative">
        <Image src="https://images.unsplash.com/photo-1501023956373-055b874f2929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMGdhbWUlMjBtYXB8ZW58MHx8fHwxNzEyODIzNTM2fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Pixel Map" />
        {posts.map((post) => (
          <Box key={post.id} position="absolute" top="50%" left={`${Math.random() * 80}%`} transform="translate(-50%, -50%)" cursor="pointer" onClick={() => handleEditPost(post.id)}>
            <Image src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMHRyZWFzdXJlJTIwY2hlc3R8ZW58MHx8fHwxNzEyODIzNTM3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Blog Post" w={12} h={12} />
          </Box>
        ))}
      </Box>

      {showEditor ? (
        <Box p={4} borderWidth={2} borderColor="gray.200" borderStyle="solid">
          <Heading as="h2" size="lg" mb={4}>
            {editPostId ? "Edit Post" : "New Post"}
          </Heading>
          <VStack spacing={4} align="stretch">
            <Textarea
              placeholder="Title"
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
              rows={1}
              resize="none"
              sx={{
                "::placeholder": {
                  color: "gray.400",
                },
              }}
            />
            <Textarea
              placeholder="Content"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              rows={8}
              resize="none"
              sx={{
                "::placeholder": {
                  color: "gray.400",
                },
              }}
            />
            <HStack justify="flex-end">
              <Button onClick={() => setShowEditor(false)}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleSavePost}>
                Save
              </Button>
            </HStack>
          </VStack>
        </Box>
      ) : (
        <VStack spacing={8} align="stretch">
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth={2} borderColor="gray.200" borderStyle="solid">
              <HStack justify="space-between">
                <Heading as="h2" size="lg">
                  {post.title}
                </Heading>
                <HStack>
                  <Button leftIcon={<FaEdit />} size="sm" onClick={() => handleEditPost(post.id)}>
                    Edit
                  </Button>
                  <Button leftIcon={<FaTrash />} size="sm" colorScheme="red" onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </Button>
                </HStack>
              </HStack>
              <Text mt={4}>{post.content}</Text>
            </Box>
          ))}
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddPost}>
            Add New Post
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
