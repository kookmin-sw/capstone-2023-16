import useDeviceType from "../hooks/useDeviceType";
import PostCard from "../components/commons/PostCard";
import TextButton from "../components/commons/TextButton";

const PostChoice = () => {
    const deviceType = useDeviceType();

    // 데이터 받아왔을 때
    const temptitle = '반려동물우린왜고양이를까칠하다고생각할까ㅁ';
    const tempdate = '2022.11.11 00:00:00';
    const tempcontent = '무관심하고까칠하다는이미지는사라지지않는것일까어느정도ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ'
    const temphashtag = ['대학', '조별과제', 'ㅁㅁㅁㅁ', 'ㅁㅁㅁㅁ', 'ㅁㅁ', 'ㅁㅁ'];

    let title = '';
    let content = '';
    let hashtag: string[] = [];

    title = (temptitle.length>20)? temptitle.substring(0,19) + '...': temptitle;
    content = (tempcontent.length>71)? tempcontent.substring(0, 70) + '...': tempcontent;
    for(let i = 0, total=16; i<temphashtag.length; i++){
        if(total-temphashtag[i].length > 0){
            hashtag.push(temphashtag[i]);
            total-=temphashtag[i].length;
        }else break;
    }

    return(
        <div>
            <PostCard widthType={deviceType} title={title} date={tempdate} content={content} hashtag={hashtag}/>
            <TextButton widthType={deviceType} text='미리보기'/>
        </div>
    )
}

export default PostChoice;
