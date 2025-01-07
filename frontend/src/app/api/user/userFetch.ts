
export const fetchAvatar = async (userId: string) => {
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/avatar`, {
        method: 'GET',
        headers: {
          Accept: 'application/json', 
        },
      });
      if (!response.ok) throw new Error('Failed to fetch avatar');
  
      const data = await response.json();
      console.log('Avatar data:', data);
      const avatarUrl = data?.avatarUrl || '/default-avatar.png';
      return avatarUrl;
    } catch (error) {
      console.error(error.message);
      return 'https://via.placeholder.com/50'; 
    }
  };