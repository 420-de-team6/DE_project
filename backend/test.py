import os

def find_path(selectedFile):
    if selectedFile == 'Je_Taime_Montmartre':
        return ['../frontend/src/musicfile/Je_Taime_Montmartre.mp3', r'C:\\Users\\임동규\\Desktop\\DE_project\\frontend\\src\\musicfile\\Je_Taime_Montmartre.mp3']
    elif selectedFile == 'Love_Game':
        return ['../frontend/src/musicfile/Love_Game.mp3', r'C:\\Users\\임동규\\Desktop\\DE_project\\frontend\\src\\musicfile\\Love_Game.mp3']
    elif selectedFile == '꿀벌브금':
        return ['../frontend/src/musicfile/꿀벌브금.mp3',r'C:\\Users\\임동규\\Desktop\\DE_project\\frontend\\src\\musicfile\\꿀벌브금.mp3']
    else:
        return FileNotFoundError
def get_audio_file(selectedFile1, selectedFile2):
    file_name1 = os.path.basename(selectedFile1)  # 파일 이름만 추출
    file_name2 = os.path.basename(selectedFile2)
    modified_file_path1 = file_name1.rsplit(".", 2)[0]
    modified_file_path1 = modified_file_path1.split("/")[-1]
    modified_file_path2 = file_name2.rsplit(".", 2)[0]
    modified_file_path2 = modified_file_path2.split("/")[-1]
    
    return find_path(modified_file_path1), find_path(modified_file_path2)
