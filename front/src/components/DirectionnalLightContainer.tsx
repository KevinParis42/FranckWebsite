
type DirectionnalLightContainerProps = {
    setDirectionnalLightX: any,
    setDirectionnalLightY: any,
    setDirectionnalLightZ: any,
    directionnalLightX: number,
    directionnalLightY: number,
    directionnalLightZ: number,
}

const DirectionnalLightContainer: React.FC<DirectionnalLightContainerProps> = (props) => {
    return (
        <div id="light-container" style={{ display: 'flex', flexDirection: 'column' }}>
            <p>directionnal light control</p>
            <div>
                <label>x</label>
                <input
                    type="number"
                    step="0.1"
                    onChange={(e) => props.setDirectionnalLightX(e.target.value)}
                    value={props.directionnalLightX}
                />
            </div>
            <div>
                <label>y</label>
                <input
                    type="number"
                    step="0.1"
                    onChange={(e) => props.setDirectionnalLightY(e.target.value)}
                    value={props.directionnalLightY}
                />
            </div>
            <div>
                <label>z</label>
                <input
                    type="number"
                    step="0.1"
                    onChange={(e) => props.setDirectionnalLightZ(e.target.value)}
                    value={props.directionnalLightZ}
                />
            </div>
        </div>

    )
}

export default DirectionnalLightContainer
