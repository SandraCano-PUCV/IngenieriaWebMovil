import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon
} from '@ionic/react';



import { logOutOutline } from 'ionicons/icons';
function Header() {
  return (
      <IonHeader>
        <IonToolbar>
          <div className="flex items-center justify-between px-5 py-2">
            {/* Título */}
            <IonTitle className="p-0">
              MicroAdapt
            </IonTitle>
            {/* Navegación */}
            <div className="flex items-center gap-4">
              <span className="hidden md:block">
                Inicio
              </span>
              <span className="hidden md:block">
                Recursos
              </span>
              <span className="hidden md:block">
                Perfil
              </span>
              <IonButton fill="clear">
                <IonIcon
                  slot="start"
                  icon={logOutOutline}
                />
                Salir
              </IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
  );

}

export default Header;