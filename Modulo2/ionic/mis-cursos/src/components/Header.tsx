import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonList,
  IonContent,
  IonItem, 
  IonLabel
} from '@ionic/react';

interface HeaderProps {
  titulo: string;
}

function Header({ titulo }: HeaderProps) {
  return (
    <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{titulo}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menú</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem routerLink="/home">
            <IonLabel>Inicio</IonLabel>
          </IonItem>

          <IonItem routerLink="/cursos">
            <IonLabel>Cursos</IonLabel>
          </IonItem>

          <IonItem routerLink="/perfil">
            <IonLabel>Perfil</IonLabel>
          </IonItem>

        </IonList>
      </IonContent>

    </IonMenu>
    </>
  );
}

export default Header;