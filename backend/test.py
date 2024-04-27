import os

def find_path(selectedFile):
    if selectedFile == '955. Je Taime Montmartre':
        return '../frontend/src/musicfile/955. Je Taime Montmartre.mp3'
    elif selectedFile == 'Love Game':
        return '../frontend/src/musicfile/Love Game.mp3'
    elif selectedFile == '951. 꿀벌브금':
        return '../frontend/src/musicfile/951. 꿀벌브금.mp3'
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
